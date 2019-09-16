<template>
    <div class="logo col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
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




