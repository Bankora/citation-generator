<template>
  <div
    class="app"
    :class="`app--${characterSelected.id}`"
    style="min-height: 100%"
  >
    <bkr-navigation />
    <div class="container">
      <form class="form" @submit.prevent="onSubmit">
        <div class="form__content">
          <!-- QUOTE -->
          <div class="form-container">
            <label class="form-container__label" for="quote">Citation:</label>
            <textarea
              class="form-container__input form-container__textarea"
              v-model="quote"
              id="quote"
              type="text"
              placeholder="Citation"
            />
            <button
              class="form-container__color form-container__color--primary"
              type="button"
              @click="onClickColor('primary')"
            />
            <button
              class="form-container__color form-container__color--secondary"
              type="button"
              @click="onClickColor('secondary')"
            />
          </div>

          <!-- AUTHOR -->
          <div class="form-container">
            <label class="form-container__label" for="author">Auteur:</label>
            <input
              class="form-container__input"
              v-model="author"
              id="author"
              type="text"
              placeholder="Auteur"
            />
          </div>

          <!-- CHARACTER -->
          <div class="form-container">
            <label class="form-container__label" for="character">Personnage:</label>
            <ul class='form-container__select-characters'>
              <li v-for="character in characterCollection" :key="character.id">
                <button
                  type="button"
                  class='form-container__select-characters__button'
                  :class="{
                    'form-container__select-characters__button--current': character.id === currentCharacterId
                  }"
                  :disabled="character.id === currentCharacterId"
                  @click="onCharaterChange(character.id)"
                  @keyup.enter="onCharaterChange(character.id)"
                  @keyup.space="onCharaterChange(character.id)"
                >
                  <img
                    class='form-container__select-characters__image'
                    :src="character.img"
                    :alt="character.id"
                  />
                </button>
              </li>
            </ul>
          </div>

          <!-- SUBMIT -->
          <a class="submit-link" target="_blank" href="https://www.notion.so/vincentbattez/45accccdf86d479fa670dd39686825f4?v=bb16af1e80984d5b9027aad2b5a1a85b">
            Notion
          </a>
          <button class="button" type="submit">
            Go
          </button>
        </div>
      </form>

      <!-- RESULT -->
      <div
        class="result"
        ref="result"
      >
        <div class="result__container__border">
          <div class='result__container'>
            <div class="result__header">
              <div class="result__character-container">
                <img alt='' class="result__character" :src="characterSelected.img"/>
                <img alt='' class="result__type" src="./assets/type/quote.svg">
              </div>
              <div class="result__title-container">
                <h3 class="result__title">{{characterSelected.title}}</h3>
                <h3 class="result__job">{{characterSelected.job}}</h3>
              </div>
            </div>
            <div class="result__quote-container">
              <p
                class="result__quote"
                v-html="quote"
                ref="resultQuote"
              />
              <span class="result__author">{{ author }}</span>
            </div>
            <div class="result__footer">
              <img alt='' class="result__footer-logo" src="./assets/bankora-logo.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import BkrNavigation from '@/components/BkrNavigation.vue';
import { generateTextFile, generateJpgFile } from '@/utils/file';
import { characterCollection } from '@/data/characterCollection';

export default {
  name: 'App',
  components: {
    BkrNavigation,
  },
  data: () => ({
    author: 'What the cut',
    quote: 'My life is <span class="result__color-primary">Banana</span>',
    characterCollection,
    characterSelected: characterCollection.ecochon,
  }),
  computed: {
    currentCharacterId() {
      return this.characterSelected.id;
    },
  },
  methods: {
    onCharaterChange(characterId) {
      this.characterSelected = this.characterCollection[characterId];
    },
    onSubmit() {
      // Generate text file
      const textFile = generateTextFile(
        this.characterSelected.id,
        this.$refs.resultQuote.textContent,
        this.author,
      );

      saveAs(textFile.content, textFile.title);

      // Generate Jpg file
      html2canvas(this.$refs.result)
        .then((canvas) => {
          const jpgFile = generateJpgFile(
            this.characterSelected.id,
            this.author,
            canvas,
          );

          saveAs(jpgFile.content, jpgFile.title);
        });
    },
    colorText(color, selectedString) {
      this.quote = this.quote.replace(
        selectedString,
        `<span class="result__color-${color}">${selectedString}</span>`,
      );
    },
    onClickColor(color) {
      this.colorText(color, window.getSelection().toString());
    },
  },
  mounted() {
    document.onkeyup = (e) => {
      const selectedString = window.getSelection().toString();
      const CtrlM = e.ctrlKey && e.key === 'm';
      const CtrlN = e.ctrlKey && e.key === 'n';

      // primary color on CTRL + M
      if (CtrlM) {
        this.colorText('primary', selectedString);
        return;
      }

      // secondary color  on CTRL + N
      if (CtrlN) {
        this.colorText('secondary', selectedString);
      }
    };
  },
};
</script>

<style lang="scss">
.app {
  --color-primary: var(--ecochon-primary);
  --color-secondary: var(--ecochon-secondary);
  --border-color: var(--ecochon-gradient);
  --background-color: var(--ecochon-background);

  &--ecochon {
    --color-primary: var(--ecochon-primary);
    --color-secondary: var(--ecochon-secondary);
    --border-color: var(--ecochon-gradient);
    --background-color: var(--ecochon-background);
  }

  &--mentalion {
    --color-primary: var(--mentalion-primary);
    --color-secondary: var(--mentalion-secondary);
    --border-color: var(--mentalion-gradient);
    --background-color: var(--mentalion-background);
  }

  &--finourson {
    --color-primary: var(--finourson-primary);
    --color-secondary: var(--finourson-secondary);
    --border-color: var(--finourson-gradient);
    --background-color: var(--finourson-background);
  }
}

// form compoment
.form {
  width: 40%;

  &__content {
    width: 450px;
    text-align: right;
    margin-left: auto;
    margin-right: 20px;
  }
}

// form container compoment
.form-container {
  text-align: left;
  margin-left: auto;
  margin-right: auto;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  &__label {
    font-size: 18px;
    font-weight: bold;
    margin-top:10px;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
  }

  &__color {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 8px;
    margin-top: 8px;
    margin-right: 8px;
    cursor: pointer;

    &--primary {
      background-color: var(--color-primary);
    }

    &--secondary {
      background-color: var(--color-secondary);
    }
  }

  &__textarea {
    height: 150px;
  }

  // Select character
  &__select-characters {
    display: flex;
    list-style: none;
    padding: 0;
    margin-top: 10px;

    li:not(:last-child) {
      margin-right: 16px;
    }

    &__button {
      background: white;
      border: 3px solid transparent;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      transition: transform 200ms ease-in-out;

      &:not(.form-container__select-characters__button--current):hover {
        transform: translateY(-5px);
      }

      &--current {
        cursor: default;
        box-shadow: 0 0 0 2px var(--color-primary);
        transform: translateY(-5px);
      }
    }

    &__image {
      width: 109px;
    }
  }
}

// result compoment
.result {
  width: 700px;
  height: 700px;
  background-color: var(--background-color);
  padding: 30px;
  position: relative;
  transition: ease-in-out all 200ms;

  &__container__border {
    height:100%;
    padding:20px;
    background-image: var(--border-color);
    transition: ease-in-out all 200ms;
  }

  // Container
  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background-color: white;
    padding-right: 60px;
    padding-left: 60px;
    padding-top: 60px;
  }

  // Header
  &__header {
    display:flex;
    width: 100%;
    align-items: center;
  }

  // Character
  &__character-container {
    position:relative;
  }

  &__character  {
    width: 110px;
    height: 110px;
  }

  &__type {
    position: absolute;
    top: -28%;
    right: -30%;
    width: 60px;
    height: 60px;
  }

  // Title
  &__title-container{
    margin-left: 25px;
  }

  &__title,
  &__job {
    font-variant: small-caps;
    letter-spacing: -0.02em;
    margin: 0;
    font-weight: 700;
  }

  &__title {
    font-size: 29px;
    line-height: 30px;
  }

  // Job
  &__job {
    font-size: 24px;
    color: var(--color-grey);
  }

  // Content
  &__quote,
  &__author {
    display:block;
    margin: 0;
    font-weight: 700;
  }

  // Quote
  &__quote-container {
    width: 100%;
  }

  &__quote {
    text-align:center;
    font-size: 30px;
    margin-bottom: 50px;
  }

  // Colors
  &__color-primary {
    color: var(--color-primary);
    transition: ease-in-out all 200ms;
  }

  &__color-secondary {
    color: var(--color-secondary);
    transition: ease-in-out all 200ms;
  }

  // Author
  &__author {
    text-align: right;
  }

  // Footer
  &__footer {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  // Logo
  &__footer-logo {
    height: 50px;
  }
}

// commun
.container {
  display:flex;
  min-height: 100%;
  padding-top: 50px;
}

.button {
  padding:10px 20px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.submit-link {
  margin-right: 16px;
  text-decoration: underline;
}
</style>
