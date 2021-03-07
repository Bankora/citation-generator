<template>
  <nav class="navigation">
    <a class="navigation__logo-link" href="#">
      <img class="navigation__logo" src="../assets/bankora-logo-blue.png" alt="">
    </a>
    <ul class="navigation__list">
      <li class="navigation__item">
        <a class="navigation__link" href="#">Bankora.fr</a>
      </li>
      <li class="navigation__item navigation__item--current">
        <a class="navigation__link" href="#">Quote generator</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BkrNavigation',
};
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background: white;

  &__logo {
    height: 40px;
  }

  &__list {
    display: flex;
    list-style: none;
    margin: 0;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 16px;
    }

    &--current a {
      color: var(--finourson-primary);
    }
  }
}
</style>
