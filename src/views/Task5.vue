<template>
  <v-container>

    <v-card class="mb-5">
      <v-card-title>
        Найти "P": 2^p <= x <= 2^(p+1)
      </v-card-title>
    </v-card>

    <v-card class="mb-5">
      <v-card-text>
        <NumberInput
            v-model="value"
            label="Введите число в двоичном виде (x)"
            binary
            :length="32"
        />
      </v-card-text>
      <v-card-title>
        P: {{ getResult }}
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

for (let i = bits.length - 1; i >= 0; i--) {
  if (bits[i]) return i
}

return 0
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
  }),

  computed: {
    getResult() {
      // X дан, найти P
      // 2^p <= x <= 2^(p+1)

      const bin = new Bin(0, 32).setBin(this.value)
      const bits = bin.getBits()

      for (let i = bits.length - 1; i >= 0; i--) {
        if (bits[i]) return i
      }

      return 0
    },
  },
}
</script>
