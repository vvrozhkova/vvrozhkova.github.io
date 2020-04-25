<template>
<div class="wrap">
  <div class="wordCard">
    <div class="front"><span>{{front}}</span></div>
    <div class="back"><span>{{back}}</span></div>
  </div>
</div>
</template>

<script>
export default {
  props: ["front", "back"]
};
</script>


<style lang="scss" scope>

body {
  font-family: sans-serif;
}
.wordCard {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* background-color: #BBDEFB; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
}
.wrap {
  width: 11vw;
  min-height: 50px;
  margin: 0.8vw 0.5vw;
  display: inline-block;
  position: relative;
  perspective: 1000px;
  z-index: 1000;
}
@media screen and (max-width: 1050px) {
  .front, .back {
    line-height: 1.3vw;
    font-size: 1.3vw;
  }
}

.front, .back {
  padding: 1.5vw 1vw;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
  backface-visibility: hidden;
  border: 2px solid var(--border-color);
  border-radius: 10px;
}
.front {
  background-color: var(--body-color);
}
.back {
  background-color: #eebbc3;
  transform: rotateY(180deg);
}
.wordCard:hover .front {transform: rotateY(180deg);}
.wordCard:hover .back {transform: rotateY(360deg);}
</style>