<template>
    <nav class="menu col-md-6 col-lg-6 col-xl-6 d-flex">
        <menu-item :item="category.node" v-for="category in $static.allRelatedCategory.edges" :key="category.node.id"/>
    </nav>
</template>

<script>
    import MenuItem from "~/components/header/MenuItem.vue";

    export default {
        components: {
            MenuItem
        }
    }
</script>

<static-query>
    query {
        allRelatedCategory{
            edges{
                node{
                    title
                    icon
                    link
                }
            }
        }
    }
</static-query>

<style scoped>

</style>



