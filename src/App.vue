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
          <input
            class="form-container__input"
            v-model="quote"
            id="quote"
            type="text"
            placeholder="Citation"
          />
        </div>

        <!-- CHARACTER -->
        <div class="form-container">
          <label class="form-container__label" for="character">Personnage:</label>
          <select v-model="character" name="character" id="character">
            <option value="Écochon">Écochon</option>
            <option value="Mentalion">Mentalion</option>
            <option value="Finourson">Finourson</option>
          </select>
        </div>

        <!-- SUBMIT -->
        <button class="button" type="submit">
          Go
        </button>
      </div>
    </form>

    <!-- RESULT -->
    <div id="js-result" class="result">
      <div class='toto'>
        <div class="result__header">
          <div class="result__character-container">
            <img class="result__character" src="./assets/characters/mentalion.svg"/>
            <img class="result__type" src="./assets/type/quote.svg">
          </div>
          <div class="result__title-container">
            <h3 class="result__title">Les citations de Mentalion</h3>
            <h3 class="result__job">Le Coach Mental</h3>
          </div>
        </div>
        <div class="result__quote-container">
          <h1 class="result__quote">{{ quote }}</h1>
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

export default {
  name: 'App',
  data: () => ({
    author: 'Lorem ipsum',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus aliquet.',
    character: '',

  }),
  methods: {
    onSubmit() {
      // Generate text file
      const textFile = generateTextFile(
        this.character,
        this.quote,
        this.author,
      );

      saveAs(textFile.content, textFile.title);

      // Generate Jpg file
      html2canvas(document.getElementById('js-result')) // use ref
        .then((canvas) => {
          const jpgFile = generateJpgFile(
            this.character,
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
.container {
  margin-top: 50px;
  display:flex;
}

// form compoment
.form {
  width:50%;

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
    width:100%;
    padding:10px;
    margin-top:10px;
  }
}

// result compoment
.result {
  width: 1000px;
  height: 1000px;
  background-color: lightcoral;
  padding: 30px;
  position:relative;

  .toto {
    height: 100%; 
    background-color: white;
    border: 20px solid orange;
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
    width:160px;
    height:160px;
  }

  &__type {
    position: absolute;
    top: -28%;
    right: -30%;
    width: 80px;
    height: 80px;
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
    font-size: 35px;
  }

  &__job {
    font-size: 25px;
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
  }

  &__author {
    text-align:right;
  }
}

.button {
  padding:10px;
  margin-top:10px;
  background-color:orange;
  border: solid black 2px;
}
</style>
