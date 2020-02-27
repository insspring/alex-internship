<template>
    <div class="userDescription">
        <h2>

        </h2>
    </div>
</template>

<script>
    export default {
        name: "UserDescription",
        computed: {
            accessToken: function () {
                return localStorage.getItem("accessToken");
            }
        },
    }
</script>

<style scoped>

</style>