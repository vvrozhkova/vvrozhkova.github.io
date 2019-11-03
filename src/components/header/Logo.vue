<template>
  <g-link class="logo" to="/" itemprop="publisher" itemscope itemtype="http://schema.org/Organization" >
    <img itemprop="logo" :alt="$static.metadata.siteName+' Logo'" src="@/assets/img/logo.svg" />
    <meta itemprop="name" content="TestAutomation.Space"/>
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