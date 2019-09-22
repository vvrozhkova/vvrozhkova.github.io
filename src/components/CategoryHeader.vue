<template>
    <header class="category-header row">
        <div class="category-title col-4">
            <h1><slot/></h1><br>
            <a :href="item.path" class="category-item__link">{{item.title}}</a>
        </div>
        <div class="category-related col-4">
            <h2>RELATED:</h2>
            <ul>
                <li v-for="relTag in related" :key="relTag.id">
                    <a :href="relTag.path" class="category-item__link">{{relTag.title}}</a>

                </li>
            </ul>
        </div>
        <div class="col-4">
            <h3>{{size}} article(s)</h3>
        </div>

    </header>
</template>

<script>
    export default {
        name: "CategoryHeader",
        props: [
            'size',
            'item',
            'related'
        ]
    }
</script>

<style scoped>
    .category-header {
        background-color: #252f6f;
        padding: 1vw 3vw;
        margin-bottom: 2vw;
    }

    .category-item__link {
        padding: 0.2vw 1vw;
        border: 2px solid white;
        border-radius: 1vw;
    }

    .category-related ul {
        font-size: 1vw;
    }

    .category-related ul li {
        display: flex;
        margin-bottom: 0.5vw;
    }

</style>