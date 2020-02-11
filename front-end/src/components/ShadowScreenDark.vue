<template>
    <ShadowScreen class="shadowScreenDark" :method="isActive"></ShadowScreen>
</template>

<script>
    import ShadowScreen from "./ShadowScreen";
    export default {
        name: "ShadowScreenDark",
        components: {ShadowScreen},
        props: {
            method: {
                type: Function,
            }
        },
        methods: {
            isActive() {
                this.method();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shadowScreenDark {
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 102;
    }
</style>