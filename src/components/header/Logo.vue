<template>
  <g-link class="logo" to="/" itemprop="publisher" itemscope itemtype="http://schema.org/Organization" >
    <div itemscope="itemscope" itemtype="http://schema.org/ImageObject" itemprop="logo">
      <img itemprop="url" :alt="$static.metadata.siteName+' Logo'" src="@/assets/img/logo.svg">
    </div>
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