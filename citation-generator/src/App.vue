<template>
  <div class="container">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__content">
      <div class="form-container">
        <label class="form-container__label" for="author">author:</label>
        <input
          class="form-container__input"
          v-model="author"
          id="author"
          type="text"
          placeholder="author"
        >
      </div>

      <div class="form-container">
        <label class="form-container__label" for="citation">Citation:</label>
        <input
          class="form-container__input"
          v-model="quote"
          id="citation"
          type="text"
          placeholder="citation"
        >
      </div>

      <button class="button" type="submit">
        Go
      </button>
      </div>
    </form>

    <div class="result">
      <span class="result__quote">{{ quote }}</span>
      <span class="result__author">{{ author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    author: '',
    quote: '',
  }),
  methods: {
    onSubmit() {
      console.log('🔥');
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
