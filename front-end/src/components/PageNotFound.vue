<template>
    <div class="pageNotFound">
        {{ $t('error404') }}
    </div>
</template>

<script>
    export default {
        name: "PageNotFound"
    }
</script>

<style lang="scss" scoped>
.pageNotFound {
    font-size: xx-large;
    margin: 5rem auto;
}
</style>