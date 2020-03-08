<template>
  <div class="logo">
    <g-link class="logo__link" to="/" title="Back to home">
      <g-image class="logo__svg" src="@/assets/images/logo.svg" alt="TestAutomation.Space" />
    </g-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  &__svg {
    max-width: 300px;
    height: auto;
    margin-top: -3px;
    margin-bottom: 0;
  }
}
</style>