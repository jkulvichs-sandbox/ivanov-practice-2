<template>
  <v-container>

    <v-card class="mb-5">
      <v-card-title>
        Обнулить младшие K бит в слове
      </v-card-title>
    </v-card>

    <v-card class="mb-5">
      <v-card-text>
        <NumberInput v-model="value" label="Введите 32 битное целое число в двоичном виде" :length="32" binary/>
      </v-card-text>
      <v-card-text>
        <NumberInput v-model="numK" label="Введите число K" :max="32" :digits="6" :length="2"/>
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
let bits = new Bin(0, 32).setBin(this.value).getBits()
for (let i = 0; i < this.numK; i++) bits[i] = false
return new Bin(0, 32).setBits(bits)
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
    numK: 0,
  }),

  computed: {
    getResult() {
      let bits = new Bin(0, 32).setBin(this.value).getBits()
      for (let i = 0; i < this.numK; i++) bits[i] = false
      return new Bin(0, 32).setBits(bits)
    },
  },
}
</script>
