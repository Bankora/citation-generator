<template>
  <div class="container">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__content">
        <!-- AUTHOR -->
        <div class="form-container">
          <label class="form-container__label" for="author">author:</label>
          <input
            class="form-container__input"
            v-model="author"
            id="author"
            type="text"
            placeholder="Auteur"
          />
        </div>

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
        </div>

        <!-- CHARACTER -->
        <div class="form-container">
          <label class="form-container__label" for="character">Personnage:</label>
          <select @input="onCharaterChange" name="character" id="character">
            <!-- @refactor: transformer ces 3 options en options dynamique  -->
            <option value="ecochon">Écochon</option>
            <option value="mentalion">Mentalion</option>
            <option value="finourson">Finourson</option>
          </select>
        </div>

        <!-- SUBMIT -->
        <button class="button" type="submit">
          Go
        </button>
      </div>
    </form>

    <!-- RESULT -->
    <div
      class="result"
      :class="characterClassModifier"
      ref="result"
    >
      <div class="result__container__border">
        <div class='result__container'>
          <div class="result__header">
            <div class="result__character-container">
              <img class="result__character" :src="characterSelected.img"/>
              <img class="result__type" src="./assets/type/quote.svg">
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
            <img class="result__footer-logo" src="./assets/bankora-logo.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { generateTextFile, generateJpgFile } from './utils/file';
import { characterCollection } from './data/characterCollection';

export default {
  name: 'App',
  data: () => ({
    author: 'Lorem ipsum',
    quote: 'Lorem ipsum <span class="result__color-primary">dolor</span> sit amet, consectetur <span class="result__color-secondary">adipiscing elit</span>. Integer tempus aliquet.',
    characterCollection,
    characterSelected: characterCollection.ecochon,
  }),
  computed: {
    characterClassModifier() {
      return `result--${this.characterSelected.id}`;
    },
  },
  methods: {
    onCharaterChange(event) {
      this.characterSelected = this.characterCollection[event.target.value];
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
  },
  mounted() {
    document.onkeyup = (e) => {
      const CtrlM = e.ctrlKey && e.key === 'm';
      const CtrlN = e.ctrlKey && e.key === 'n';

      // primary color on CTRL + M
      if (CtrlM) {
        this.quote = this.quote.replace(
          window.getSelection().toString(),
          `<span class="result__color-primary">${window.getSelection().toString()}</span>`,
        );
        return;
      }

      // secondary color  on CTRL + N
      if (CtrlN) {
        this.quote = this.quote.replace(
          window.getSelection().toString(),
          `<span class="result__color-secondary">${window.getSelection().toString()}</span>`,
        );
      }
    };
  },
};
</script>

<style lang="scss">
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

  &__label {
    margin-top:10px;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }

  &__textarea {
    height: 150px;
  }
}

// result compoment
.result {
  --color-primary: var(--ecochon-primary);
  --color-secondary: var(--ecochon-secondary);
  --border-color: var(--ecochon-gradient);
  --background-color: var(--ecochon-background);

  width: 700px;
  height: 700px;
  background-color: var(--background-color);
  padding: 30px;
  position: relative;
  transition: ease-in-out all 200ms;

  // .result--ecochon
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

  &__container__border {
    height:100%;
    padding:20px;
    background-image: var(--border-color);
    transition: ease-in-out all 200ms;
  }

  // Container
  &__container {
    position: relative;
    height: 100%;
    background-color: white;
    padding-right: 60px;
    padding-left: 60px;
    padding-top: 60px;
  }

  // Header
  &__header {
    display:flex;
    align-items: center;
    margin-bottom: 50px;
    // margin-top: 70px;
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

  &__job {
    font-size: 24px;
    color: var(--color-grey);
  }

  // Content
  &__quote,
  &__author {
    display:block;
    // line-height: 30px;
    margin: 0;
    font-weight: 700;
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

  &__author {
    text-align: right;
  }

  // Footer
  &__footer {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 0;
  }

  &__footer-logo {
    height: 50px;
  }
}

// commun
.container {
  margin-top: 50px;
  display:flex;
}

.button {
  padding:10px 20px;
  margin-top:10px;
  background-color: var(--mentalion-primary);
  border: none;
}
</style>
