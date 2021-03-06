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
      id="js-result"
      class="result"
      :class="characterClassModifier"
    >
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
          <p class="result__quote" v-html="quote" />
          <span class="result__author">{{ author }}</span>
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
        this.quote,
        this.author,
      );

      saveAs(textFile.content, textFile.title);

      // Generate Jpg file
      html2canvas(document.getElementById('js-result')) // use ref
        .then((canvas) => {
          const jpgFile = generateJpgFile(
            this.characterSelected.id,
            this.quote,
            canvas,
          );

          saveAs(jpgFile.content, jpgFile.title);
        });
    },
  },
};
</script>

<style lang="scss">
// form compoment
.form {
  width: 30%;

  &__content {
    width:300px;
    text-align: right;
    margin:auto;
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

  // Container
  &__container {
    height: 100%;
    background-color: white;
    border: 20px solid;
    border-image-slice: 1;
    border-image-source: var(--border-color);
    padding-right: 60px;
    padding-left: 60px;
  }

  // Header
  &__header {
    display:flex;
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
    margin-left:25px;
  }

  &__title,
  &__job {
    font-variant: small-caps;
    letter-spacing: -0,02em;
    margin: 0;
    line-height: 30px;
    font-weight: 700;
  }

  &__title {
    font-size: 28px;
  }

  &__job {
    font-size: 20px;
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
  }

  // Colors
  &__color-primary {
    color: var(--color-primary);
  }

  &__color-secondary {
    color: var(--color-secondary);
  }

  &__author {
    text-align:right;
  }

}

// commun
.container {
  margin-top: 50px;
  display:flex;
}

.button {
  padding:10px;
  margin-top:10px;
  background-color:orange;
  border: solid black 2px;
}
</style>
