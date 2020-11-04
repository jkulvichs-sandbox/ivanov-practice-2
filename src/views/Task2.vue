<template>
  <v-container>

    <v-card class="mb-5">
      <v-card-title>
        Склеить первые и последние I бит, показать середину
      </v-card-title>
    </v-card>

    <v-card class="mb-5">
      <v-card-text>
        <NumberInput
            v-model="digits"
            label="Введите количество бит числа (len) [1-256]"
            default="32"
            :max="256"
            :min="1"
            :digits="9"
        />
      </v-card-text>
      <v-card-text>
        <NumberInput
            v-model="value"
            label="Введите число в двоичном виде"
            :digits="+digits"
            :max="Infinity"
            binary
            :length="+digits"
        />
      </v-card-text>
      <v-card-text>
        <NumberInput
            v-model="numI"
            label="Введите количество бит отступа (i)"
            :max="Math.trunc((+digits)/2)"
            :digits="32"/>
      </v-card-text>

      <v-card-text>
        <v-card v-if="getResult.A">
          <v-card-text>Вариант A | Склеить первые и последние I бит</v-card-text>
          <v-card-title>
            BIN: {{ getResult.A.toBin() }}
          </v-card-title>
          <v-card-title>
            HEX: {{ getResult.A.toHex() }}
          </v-card-title>
        </v-card>
        <v-card v-else>
          <v-card-text>Вариант A | Склеить первые и последние I бит</v-card-text>
          <v-card-title>
            Нет возможности построить число с 0 бит
          </v-card-title>
        </v-card>
      </v-card-text>

      <v-card-text>
        <v-card v-if="getResult.B">
          <v-card-text>Вариант B | Показать биты в середине</v-card-text>
          <v-card-title>
            BIN: {{ getResult.B.toBin() }}
          </v-card-title>
          <v-card-title>
            HEX: {{ getResult.B.toHex() }}
          </v-card-title>
        </v-card>
        <v-card v-else>
          <v-card-text>Вариант B | Показать биты в середине</v-card-text>
          <v-card-title>
            Нет возможности построить число с 0 бит
          </v-card-title>
        </v-card>
      </v-card-text>

    </v-card>

    <v-card>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Код реализации</v-expansion-panel-header>
            <v-expansion-panel-content>
              <pre>
const bits = new Bin(0, +this.digits).setBin(this.value).getBits()

const bitsLeft = bits.slice(0, this.numI)
const bitsRight = bits.slice(bits.length - this.numI)
const bitsMiddle = bits.slice(this.numI, bits.length - this.numI)

const bitsLeftRight = [...bitsLeft, ...bitsRight]

return {
  A: bitsLeftRight.length ? new Bin(0, bitsLeftRight.length).setBits(bitsLeftRight) : null,
  B: bitsMiddle.length ? new Bin(0, bitsMiddle.length).setBits(bitsMiddle) : null
}
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
    digits: 32,
    value: '',
    numI: 0,
  }),

  computed: {
    getResult() {
      const bits = new Bin(0, +this.digits).setBin(this.value).getBits()

      const bitsLeft = bits.slice(0, this.numI)
      const bitsRight = bits.slice(bits.length - this.numI)
      const bitsMiddle = bits.slice(this.numI, bits.length - this.numI)

      const bitsLeftRight = [...bitsLeft, ...bitsRight]

      return {
        A: bitsLeftRight.length ? new Bin(0, bitsLeftRight.length).setBits(bitsLeftRight) : null,
        B: bitsMiddle.length ? new Bin(0, bitsMiddle.length).setBits(bitsMiddle) : null
      }
    },
  },
}
</script>
