<script>
export default {
  props: {
    letters: { type: Array, required: true },
    correctLetters: { type: Array, default: () => [] },
  },
};
</script>

<template>
  <div class="word">
    <span class="letter" v-for="(letter, i) in letters" :key="i">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>

<style lang="sass" scoped>
.word
  display: flex
  position: absolute
  bottom: 10px
  left: 50%
  transform: translateX(-50%)

.letter
  border-bottom: 3px solid #2980b9
  display: inline-flex
  font-size: 30px
  align-items: center
  justify-content: center
  margin: 0 3px
  height: 50px
  width: 20px
</style>