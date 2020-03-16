<template>
    <input class="defaultInput" :type="inputType" :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
    export default {
        name: "DefaultInput",
        props: {
            inputType: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";

.defaultInput {
    border: none;
    background-color: $c-alabaster;
    outline: none;

    &:focus {
        border: 0.1rem solid green;
        border-radius: 1rem;
        height: 2rem;
        font-size: x-large;
        padding: 0 1rem;
    }
}
</style>