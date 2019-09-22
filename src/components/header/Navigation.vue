<template>
    <nav class="menu">
        <menu-item :item="category.node" v-for="category in categories" :key="category.node.id"/>
    </nav>
</template>

<script>
    import MenuItem from "~/components/header/MenuItem.vue";

    export default {
        props: ["categories"],
        components: {
            MenuItem
        }
    }
</script>