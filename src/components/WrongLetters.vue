<script>
export default {
  props: {
    wrongLetters: { type: Array, default: () => [] },
  },
};
</script>

<template>
  <div class="wrong-letters-container">
    <div class="wrong-letters">
      <p v-show="wrongLetters.length > 0">Wrong</p>
      <span v-for="(letter, i) in wrongLetters" :key="letter">
        {{ letter }}
        {{ i === wrongLetters.length - 1 ? '' : ', ' }}
      </span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.wrong-letters-container
  position: absolute
  top: 20px
  right: 20px
  display: flex
  flex-direction: column
  text-align: right

.wrong-letters p
  margin: 0 0 5px
</style>