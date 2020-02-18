<template>
    <div class="settings">
        <HeaderLayout></HeaderLayout>
        <h2>
            {{ $t('settings') }}
        </h2>
        <div class="changeSection">
            <p>
                {{ $t('name') }}
            </p>
            <label for="user_name">
                <input
                        type="text"
                        id="user_name"
                />
            </label>
            <ButtonBasic
                    :method="changeUserData"
                    :text="$t('change')">
            </ButtonBasic>
            <p>
                {{ $t('email') }}
            </p>
            <label for="user_email">
                <input
                        type="email"
                        id="user_email"
                />
            </label>
            <ButtonBasic
                    :method="changeUserData"
                    :text="$t('change')">
            </ButtonBasic>
            <p>
                {{ $t('password') }}
            </p>
            <label for="user_password">
                <input
                        type="password"
                        id="user_password"
                />
            </label>
            <ButtonBasic
                    :method="changeUserData"
                    :text="$t('change')">
            </ButtonBasic>
        </div>
    </div>
</template>

<script>
    import HeaderLayout from "../components/HeaderLayout";
    import ButtonBasic from "../components/ButtonBasic";
    import axios from "axios";

    export default {
        name: "Settings",
        components: {ButtonBasic, HeaderLayout},
        data: function() {
            return {
                user: ""
            }
        },
        methods: {
            changeUserData() {
                this.userCreate();
                /*axios.put("/users/2", this.user).then(result => console.log(result.data));*/
                axios.get("/users").then(result => console.log(result));
            },
            userCreate: function() {
                this.user = {
                    name: 'alex',
                    email: 'this.userEmail',
                    password: 'this.userPassword',
                    image: 'this.$store.getters.USER_IMAGE'
                };
            }
        }
    }
</script>

<style scoped>

</style>