<template>
<div class="quizlet">
    <iframe :src="'https://quizlet.com/'+id+'/flashcards/embed'" height="500" width="100%" style="border:0"></iframe>
</div>
</template>

<script>
export default {
    props:["id"]
}
</script>

<style>
.quizlet{
    position: relative;
    width: 100%;
    height: 500px;
    margin-bottom: 1vw;;
}
</style>