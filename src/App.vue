<script>
import { onKeydown } from './assets/onKeydown';
import { computed, ref } from 'vue';

import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

const wordList = ['programming', 'vuejs', 'composition'];

function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

export default {
  components: { Header, Figure, WrongLetters, Word, Popup, Notification },
  setup() {
    const word = ref(getRandomWord(wordList));
    const guessedLetters = ref([]);

    const letters = computed(() => word.value.split(''));
    const wrongLetters = computed(() =>
      guessedLetters.value.filter(letter => !letters.value.includes(letter))
    );
    const correctLetters = computed(() =>
      guessedLetters.value.filter(letter => letters.value.includes(letter))
    );

    const status = computed(() => {
      if (wrongLetters.value.length === 6) return 'lose';
      if (letters.value.every(letter => correctLetters.value.includes(letter)))
        return 'win';
      return '';
    });

    function reset() {
      guessedLetters.value = [];
      word.value = getRandomWord(wordList);
    }

    const notification = ref(false);

    function showNotification(sec) {
      notification.value = true;
      setTimeout(() => {
        notification.value = false;
      }, sec * 1000);
    }

    onKeydown(e => {
      const letter = e.key.toLowerCase();
      if (e.keyCode < 65 && e.keyCode > 90) return;
      if (status.value) return;
      if (guessedLetters.value.includes(letter)) return showNotification(2);
      guessedLetters.value.push(letter);
    });

    return {
      word,
      guessedLetters,
      letters,
      wrongLetters,
      correctLetters,
      status,
      reset,
      notification,
    };
  },
};
</script>

<template>
  <Header />
  <div class="game-container">
    <Figure :wrong-count="wrongLetters.length" />
    <WrongLetters :wrong-letters="wrongLetters" />
    <Word :letters="letters" :correct-letters="correctLetters" />
  </div>
  <Popup :status="status" :word="word" @reset="reset" />
  <Notification :show="notification" />
</template>

<style lang="sass">
*
  box-sizing: border-box;

html, body
  height: 100%

body
  background-color: #34495e
  color: #fff
  font-family: Arial, Helvetica, sans-serif
  display: flex
  justify-content: center
  align-items: center
  margin: 0
  overflow: hidden

h1
  margin: 20px 0 0

.game-container
  padding: 20px 30px
  position: relative
  margin: auto
  height: 350px
  width: 450px
</style>
