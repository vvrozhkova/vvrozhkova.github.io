<template>
  <div class="slide-box row">
    <div class="col-4">
      <div class="slide-number">0{{index}}</div>
    </div>
    <div class="col-4">
      <div class="circle" :style="headerStyle">
        <g-image :src="slide.image" class="card-img" :alt="slide.title"></g-image>
        <g-link
          v-for="tag in slide.tags"
          :key="tag.id"
          :to="tag.path"
          rel="tag"
          class="label rounded-circle"
          :style="headerStyle"
        >
          <span>{{tag.title}}</span>
        </g-link>
      </div>
    </div>
    <div class="col-4">
      <g-link
        :to="slide.category.path"
        class="slide-category-link"
      >{{slide.category.title.toUpperCase()}}</g-link>
      <br />

      <h2 class="slide-title-link">
        <g-link :to="slide.path">{{slide.title}}</g-link>
      </h2>

      <hr align="center" />
      <ul>
        <li v-for="tableContentItem in slide.headings" :key="tableContentItem.id">
          -
          <g-link :to="slide.path.slice(0, -1)+tableContentItem.anchor">{{tableContentItem.value}}</g-link>
        </li>
      </ul>
      <div class="slide-read-button">
        <ReadButton :path="slide.path" />
      </div>
    </div>
  </div>
</template>

<script>
import ReadButton from "~/components/ReadButton.vue";
export default {
  name: "SliderItem",
  props: ["slide", "index"],
  computed: {
    headerStyle: function() {
      if (this.slide.color != "") {
        return "background-color:" + this.slide.color + ";";
      } else {
        return "background-color: #252152;";
      }
    }
  },
  components: {
    ReadButton
  }
};
</script>

<style lang="scss" scoped>
$container-size: 30vw;
$element-size: 6vw;
.circle {
  // display: inline-block;
  width: $container-size;
  height: $container-size;
  padding: 5vw 3vw 3vw 3vw;
  margin: $element-size/2 0;
  background: lightgray;
  border: 2px solid #fff;
  position: relative;
  border-radius: 50%;
  // margin-top: 1vw;
}
.label {
  width: $element-size;
  height: $element-size;
  border-radius: $element-size;
  position: absolute;
  left: 40%;
  top: 40%;
  text-align: center;
  border: 2px solid #fff;
  display: table;
  line-height: 0.8vw;
  font-size: 1vw;
  span {
    display: table-cell;
    vertical-align: middle;
  }
  // transform-origin: 50%, + $element-size / 2 - $container-size / 2;
}
.label:hover {
  border: 2px solid #007bff;
}
//Magic starts here
@for $i from 2 through 10 {
  @for $j from 2 through $i {
    .label:nth-child(#{$j}):nth-last-child(#{$i - $j}) {
      $time: ($j - 1) / ($i - 1);
      $rotate: 360deg * $time + 100deg;
      transform: rotate(-$rotate) translate(0%, -270%) rotate($rotate);
    }
  }
}
.slide-box {
  height: 35vw;
}
.slide-number {
  font-family: "Keania One", cursive;
  font-size: 12vw;
  margin-top: -0.3vw;
}
// .circle {
//   border-radius: 50%;
//   /* background-color: #252f6f; */
//   width: 30vw;
//   height: 30vw;
//   text-align: center;
// }
.slide-category-link {
  font-size: 1.5vw;
  color: #fff;
  font-family: "Oswald", sans-serif;
  text-decoration: none;
}
.slide-title-link {
  font-size: 2vw;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}
.slide-box ul {
  font-size: 1.1vw;
}
.slide-read-button {
  bottom: 0;
  position: absolute;
  right: 5vw;
}
hr {
  margin: 1.5vw 0;
}
</style>