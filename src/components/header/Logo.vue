<template>
    <div class="logo">
        <g-link to="/">
            <img :alt="$static.metadata.siteName+' Logo'" src="../../assets/img/logo.svg">
        </g-link>
    </div>
</template>

<static-query>
    query Blog{
        metadata {
            siteName
        }
    }
</static-query>





