<template>
  <div id="terminal" class="screen">
    <ul class="icons">
      <li class="closei"></li>
      <li class="minimize"></li>
      <li class="maximize"></li>
    </ul>
    <div class="title center">bash</div>

    <div class="address-line">
      <div class="line">
        <div class="arrows">
          <i class="fas fa-caret-left"></i>
          <i class="fas fa-caret-right"></i>
        </div>
        <span>test</span>
      </div>
    </div>

    <div class="window">
      <slot />

      <span class="comment">{{comment}}
        <!-- <slot name="comment" /> -->
      </span>

      <!-- <template v-slot:comment>comment</template> -->
    </div>
  </div>
</template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"]
};
</script>
