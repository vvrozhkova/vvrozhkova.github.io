<template>
  <g-link class="logo" to="/">
    <img :alt="$static.metadata.siteName+' Logo'" src="@/assets/img/logo.svg" />
  </g-link>
</template>

<static-query>
    query Blog{
        metadata {
            siteName
        }
    }
</static-query>

<style scoped>
.logo {
  margin: auto;
}
</style>