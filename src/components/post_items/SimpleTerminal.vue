<template>
  <div id="terminal">
    <div class="title right">{{title}}</div>
    <div class="window">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>
