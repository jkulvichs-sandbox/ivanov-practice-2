"use strict"

class BinError extends Error {
    name = "Bin"

    constructor(desc) {
        super(desc)
    }
}

export default class Bin {
    // Хранилище состояния значения
    _num = BigInt(0)

    get num() {
        return this._num
    }

    set num(val) {
        if (typeof val !== typeof 0n) throw new BinError(`err val type must bigint, got ${typeof val}`)
        this._num = val
        this._syncLength()
    }

    // Длина бит числа
    _length = 0

    get length() {
        return this._length
    }

    set length(len) {
        if (typeof len !== typeof Number()) throw new BinError(`err len type must number, got ${typeof len}`)
        if (len < 1) throw new BinError(`err len must be greater 0, got ${len}`)
        this._length = len
        this._syncLength()
    }

    // Синхронизирует размер числа в соответствии с length
    // Урезает биты числа если они не попадают в размер
    _syncLength() {
        let bits = this.num.toString(2)
        if (bits.length > this.length) {
            bits = bits.substr(bits.length - this.length, this.length)
            this.num = BigInt(`0b${bits}`)
        }
    }

    // ==========[ Конструктор ]========== //

    // Устанавливает число и длину
    constructor(num = 0, len = 32) {
        this.length = len
        this.num = BigInt(num)
    }

    // Клонирует и возвращает новый экземпляр числа
    clone() {
        return new Bin(this.num, this.length)
    }

    // Устанавливает все биты в 1
    // Получает максимально возможное число
    setMax() {
        this.setBits(new Array(this.length).fill(true))
        return this
    }

    // Устанавливает все биты в 0
    // Получает минимально возможное число
    setMin() {
        this.setBits(new Array(this.length).fill(false))
        return this
    }

    // ==========[ Конвертация ]========== //

    // Устанавливает число в виде десятичного значения или строки
    setNum(num) {
        if (typeof num !== typeof Number() && typeof num !== typeof String())
            throw new BinError(`err num type must number or string, got ${typeof num}`)
        this.num = BigInt(num)
        return this
    }

    // Возвращает число в десятичной системе в виде строки
    toNum() {
        return this.num.toString()
    }

    // Устанавливает двоичное число принимает строку
    setBin(num) {
        if (typeof num !== typeof String()) throw new BinError(`err num type must string, got ${typeof num}`)
        if (num.length === 0) {
            this.num = BigInt(0)
            return this
        }
        if (!num.split('').every(n => n === '1' || n === '0')) throw new BinError(`err num isn't bin str, got ${num}`)
        this.num = BigInt(`0b${num}`)
        return this
    }

    // Возвращает число в двоичной системе в виде строки
    toBin() {
        return this.num.toString(2).padStart(this.length, '0')
    }

    // Устанавливает шестнадцатеричное число принимает строку
    setHex(num) {
        if (typeof num !== typeof String()) throw new BinError(`err num type must string, got ${typeof num}`)
        if (num.length === 0) {
            this.num = BigInt(0)
            return this
        }
        this.num = BigInt(`0x${Number.parseInt(num, 16)}`)
        return this
    }

    // Возвращает число в шестнадцатеричной системе в виде строки 8 символов
    toHex() {
        return this.num.toString(16).padStart(Math.ceil(this.length / 4), '0').toUpperCase()
    }

    // ==========[ Управление битами ]========== //

    // Возвращает значение бита по номеру
    getBit(bit) {
        if (typeof bit !== typeof Number()) throw new BinError(`err bit type must number, got ${typeof bit}`)
        if (bit < 0 || bit >= this.length) throw new BinError(`err bit pos must [0-${this.length}], got ${bit}`)
        return this.toBin()[this.length - bit - 1] === '1'
    }

    // Устанавливает бит но номеру, принимает номер бита и true/false
    setBit(bit, val) {
        if (typeof bit !== typeof Number()) throw new BinError(`err bit type must number, got ${typeof bit}`)
        if (bit < 0 || bit >= this.length) throw new BinError(`err bit pos must [0-${this.length}], got ${bit}`)
        if (typeof val !== typeof Boolean()) throw new BinError(`err val type must bool, got ${typeof val}`)

        let bits = this.toBin().split('')
        bits.splice(this.length - bit - 1, 1, val ? '1' : '0')
        this.setBin(bits.join(''))
        return this
    }

    // Возвращает все биты числа в виде массива boolean
    getBits() {
        const bits = new Array(this.length)
        for (let i = 0; i < this.length; i++)
            bits[i] = this.getBit(i)
        return bits
    }

    // Устанавливает биты числа
    // Устанавливает само число и его размер
    setBits(bits) {
        if (!Array.isArray(bits)) throw new BinError(`err bits type must array, got ${typeof bits}`)
        if (!bits.every(b => typeof b === typeof Boolean())) throw new BinError(`err bits must contains only bool`)
        this.length = bits.length
        this.setBin(bits.reverse().map(b => b ? '1' : '0').join(''))
        return this
    }

    // ==========[ Битовые операции ]==========

    // Возвращает новое число применяя операции к битам
    // Длина бит берётся из первого числа и в функцию передаётся бит первого и второго числа
    // Результат должен возвращаться для каждого бита
    static apply(a, b, func) {
        if (!(a instanceof Bin)) throw new BinError(`err param a isn't Bin type`)
        if (!(b instanceof Bin)) throw new BinError(`err param b isn't Bin type`)
        if (typeof func !== typeof Function()) throw new BinError(`err param func must function, got ${typeof func}`)

        const bitsA = a.getBits()
        const cloneB = b.clone()
        cloneB.length = a.length
        const bitsB = cloneB.getBits()

        const bits = bitsA.map((bitA, i) => {
            const res = func(bitA, bitsB[i])
            if (typeof res !== typeof Boolean()) throw new BinError(`func result must bool, got ${typeof res}`)
            return res
        })

        return new Bin().setBits(bits)
    }

    // Возвращает новое число - результат xor
    static xor(a, b) {
        return Bin.apply(a, b, (bitA, bitB) => bitB ? !bitA : bitA)
    }

    // Возвращает новое число - результат and
    static and(a, b) {
        return Bin.apply(a, b, (bitA, bitB) => bitB && bitA)
    }

    // Возвращает новое число - результат or
    static or(a, b) {
        return Bin.apply(a, b, (bitA, bitB) => bitB || bitA)
    }
}
