<template>
<div class="wrap">
  <div class="card">
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


<style >
body {
  font-family: sans-serif;
}
.card {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #BBDEFB;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 300px;
  height: 300px;
  position: relative;
  perspective: 1000px;
  z-index: 1000;
}
.front, .back {
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
  border-radius: 10px;
}
.front {
  background-color: #fff;
}
.back {
  background-color: #BDBDBD;
  transform: rotateY(180deg);
}
.card:hover .front {transform: rotateY(180deg);}
.card:hover .back {transform: rotateY(360deg);}
</style>