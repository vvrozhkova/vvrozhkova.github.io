<template>
  <div class="bigfoot-footnote__container">
    <button
      href="#"
      class="bigfoot-footnote__button"
      rel="footnote"
      id="fnref:feature-image"
      :data-footnote-number="num"
      :data-footnote-identifier="num"
      :title="'See footnote '+num"
      :data-bigfoot-footnote="message"
    >
      <span class="visually-hidden">{{num}}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["num", "message"]
};
</script>
