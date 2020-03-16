<template>
    <textarea class="commentTextarea" :value="value" @input="mixin_autoResize_resize && $emit('input', $event.target.value)" />
</template>

<script>
    import mixinAutoResize from "../helpers/autoResize";

    export default {
        name: "CommentTextarea",
        mixins: [mixinAutoResize],
        props: {
            value: {
                type: String,
                required: true
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../scss/variables";

.commentTextarea {
    background-color: $c-alabaster;
    border: none;
    border-bottom: 1px solid $c-danube;
    outline: none;
    resize: none;
}
</style>