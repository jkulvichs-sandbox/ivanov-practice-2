<template>
  <v-container>

    <v-card class="mb-5">
      <v-card-title>
        Поменять местами байты в заданном 32-х разрядном целом числе
      </v-card-title>
    </v-card>

    <v-card class="mb-5">
      <v-card-text>
        <NumberInput
            v-model="value"
            label="Введите число в двоичном виде"
            binary
            :length="32"
        />
      </v-card-text>
      <v-card-text>
        <NumberInput
            v-model="byteA"
            label="Введите номер первого байта"
            :max="4"
            :digits="3"
            :length="1"
        />
      </v-card-text>
      <v-card-text>
        <NumberInput
            v-model="byteB"
            label="Введите номер второго байта"
            :max="4"
            :digits="3"
            :length="1"
        />
      </v-card-text>
      <v-card-title>
        BIN: {{ getResult.toBin() }}
      </v-card-title>
      <v-card-title>
        HEX: {{ getResult.toHex() }}
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Код реализации</v-expansion-panel-header>
            <v-expansion-panel-content>
              <pre>
const bin = new Bin(0, 32).setBin(this.value)
const bits = bin.getBits()

const bitsA = bits.slice(+this.byteA * 8, +this.byteA * 8 + 8)
const bitsB = bits.slice(+this.byteB * 8, +this.byteB * 8 + 8)

bits.splice(+this.byteA * 8, 8, ...bitsB)
bits.splice(+this.byteB * 8, 8, ...bitsA)

return bin.setBits(bits)
              </pre>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
import Bin from '@/libs/bin.js'
import NumberInput from '@/components/NumberInput'

export default {
  components: {
    NumberInput,
  },

  data: () => ({
    value: '',
    byteA: 0,
    byteB: 0,
  }),

  computed: {
    getResult() {
      const bin = new Bin(0, 32).setBin(this.value)
      const bits = bin.getBits()

      const bitsA = bits.slice(+this.byteA * 8, +this.byteA * 8 + 8)
      const bitsB = bits.slice(+this.byteB * 8, +this.byteB * 8 + 8)

      bits.splice(+this.byteA * 8, 8, ...bitsB)
      bits.splice(+this.byteB * 8, 8, ...bitsA)

      return bin.setBits(bits)
    }
  },
}
</script>
