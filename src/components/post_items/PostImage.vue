<template>
  <div id="terminal" class="screen">
    <div class="window">
      <slot />
      <span class="comment">{{comment}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"]
};
</script>
