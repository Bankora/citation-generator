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

    <div id="result" class="result">
      <h1 class="result__quote">{{ quote }}</h1>
      <span class="result__author">{{ author }}</span>
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
    author: '',
    quote: '',
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
      html2canvas(document.getElementById('result'))
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
  &__quote,
  &__author {
    display:block;
  }
}

.button {
  padding:10px;
  margin-top:10px;
  background-color:orange;
  border: solid black 2px;
}
</style>
