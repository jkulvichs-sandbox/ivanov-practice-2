<template>
  <v-text-field
      aria-autocomplete="none"
      :prepend-icon="binary ? 'mdi-numeric-10' : 'mdi-numeric'"
      :append-icon="getError() ? 'mdi-alert-octagon' : ''"
      outlined
      :label="label"
      :hint="getError() || getHint()"
      persistent-hint
      :value="value"
      :counter="this.length ? this.length : false"
      :maxlength="this.length ? this.length : false"
      @input="onInput"
      :error="!!getError()"
  />
</template>

<script>
import Bin from "@/libs/bin";

export default {
  data: () => ({
    value: '',
  }),

  props: {
    max: {type: Number, default: 4294967295,},
    min: {type: Number, default: 0,},
    label: {type: String, default: 'Введите число'},
    digits: {type: Number, default: 32,},
    default: {type: String, default: ''},
    length: {type: Number, default: 0},
    binary: {type: Boolean, default: false},
  },

  mounted() {
    this.value = String(this.default)
  },

  computed: {
    num() {
      const bin = new Bin(0, this.digits)
      if (this.binary)
        bin.setBin(this.value)
      else
        bin.setNum(this.value)
      return bin
    },
  },

  methods: {
    getHint() {
      if (this.value.length > 0) {
        if (this.binary)
          return `DEC: ${this.num.toNum()}, HEX: ${this.num.toHex()}`
        else
          return `BIN: ${this.num.toBin()}, HEX: ${this.num.toHex()}`
      } else
        return `Допустимый диапазон от ${this.min} до ${this.max} (${this.digits} бит)`
    },
    getError() {
      if (this.value < 0) return 'Только положительные числа разрешены'
      if (this.binary) {
        if (!this.value.split('').every(num => num === '1' || num === '0')) return 'Только числа в бинарном формате'
        if (new Bin(0, this.digits).setBin(this.value) > new Bin(0, this.digits).setMax().num)
          return `Число выходит за пределы ${this.digits} бит`
        if (new Bin(0, this.digits).setBin(this.value).num < this.min) return `Не может быть меньше ${this.min}`
        if (new Bin(0, this.digits).setBin(this.value).num > this.max) return `Не может быть больше ${this.max}`
      } else {
        if (this.value != +this.value) return 'Только числа в десятичном формате'
        if (BigInt(this.value) > new Bin(0, this.digits).setMax().num) return `Число выходит за пределы ${this.digits} бит`
        if (BigInt(this.value) < this.min) return `Не может быть меньше ${this.min}`
        if (BigInt(this.value) > this.max) return `Не может быть больше ${this.max}`
      }
      return null
    },
    onInput(val) {
      this.value = val
      if (!this.getError()) this.$emit('input', val)
    },
  },
}
</script>
