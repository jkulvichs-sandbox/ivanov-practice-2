<template>
  <v-container>

    <v-card>
      <v-card-title>
        Практическое занятие по криптографии №2
      </v-card-title>
      <v-card-text>
        <p>Практическое занятие засчитывается, если сданы все задания.</p>
        <p style="text-decoration: underline">
          Все программы должны быть интерактивными. Каждый запрос ввода должен
          сопровождаться комментарием.
        </p>
        <p>С клавиатуры вводится 32-х разрядное целое число в двоичной системе счисления.</p>
        <ol>
          <li>Обнулить младшие k бит в заданном слове.</li>
          <li>
            <p>
              A) «Склеить» первые <code>i</code> битов с последними <code>i</code> битами из целого числа длиной
              <code>len</code> битов. Пример. Пусть есть 12-ти разрядное целое число, представленное в двоичной
              системе счисления <code>10001110110</code>. «Склеим» первые 3 и последние 3 бита, получим
              <code>100101</code>.
            </p>
            <p>
              B) Получить биты из целого числа длиной <code>len</code> битов, находящиеся между первыми
              <code>i</code> битами и последними <code>i</code> битами. Пример. Пусть есть 12-ти разрядное целое
              число, представленное в двоичной системе счисления <code>10001110110</code>. Получим биты
              находящиеся между первыми 3 и последними 3 битами: <code>011101</code>.
            </p>
          </li>
          <li>Поменять местами байты в заданном 32-х разрядном целом числе. Перестановка задается пользователем.</li>
          <li>
            Найти максимальную степень 2 на которую делится данное целое число. Примечание.
            Операторами цикла пользоваться нельзя.
          </li>
          <li>
            <p>Пусть <code>x</code> целое число. Найти такое <code>p</code>, что <code>2^p <= x <= 2^(p+1)</code>.</p>
            <p>Все результаты вывести на экран в двоичном, шестнадцатеричном и десятичном форматах.</p>
            <p>
              Во всех последующих программах работа с файлами должна проводиться в бинарном режиме. В качестве шифруемых файлов следует брать текстовый файл, картинку и музыкальный файл.
            </p>
          </li>
          <li>Реализовать алгоритм RC4.</li>
          <li>Написать программу взламывающую шифр, основанный на простом «xor».</li>
          <li>Написать программу, взламывающую шифр Цезаря. </li>
        </ol>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
export default {
  components: {}
}
</script>
