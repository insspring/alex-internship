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
                        v-model="userName"
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
                        v-model="userEmail"
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
                        v-model="userPassword"
                />
            </label>
            <ButtonBasic
                    :method="changeUserData"
                    :text="$t('change')">
            </ButtonBasic>
            <p>
                {{ $t('password') }}
            </p>
            <label for="user_image">
                <input
                        type="file"
                        id="user_image"
                        @change="previewFiles"
                />
            </label>
        </div>
    </div>
</template>

<script>
    import HeaderLayout from "../components/HeaderLayout";
    import ButtonBasic from "../components/ButtonBasic";
    import axios from "axios";
    import { signinUser } from "../helpers/api";

    export default {
        name: "Settings",
        components: {ButtonBasic, HeaderLayout},
        data: function() {
            return {
                user: "",
                userName: this.$store.getters.USER_NAME,
                userEmail: this.$store.getters.USER_EMAIL,
                userPassword: this.$store.getters.USER_PASSWORD,
                userImage: this.$store.getters.USER_DEFAULT_IMAGE,
            }
        },
        methods: {
            changeUserData() {
                this.userCreate();
                axios.put("/users/3", this.user).then(result => console.log(result.data));
                signinUser(this.user).then(result => localStorage.setItem("accessToken", result.data.access_token));
            },
            userCreate: function() {
                this.user = {
                    name: this.userName,
                    email: this.userEmail,
                    password: this.userPassword,
                    image: localStorage.getItem("userImage")
                };
            },
            previewFiles(event) {
                if (event.target.files[0]) {
                    let reader = new FileReader();
                    var input = event.target;
                    let dataURL;
                    reader.onload = function(){
                        dataURL = reader.result;
                        localStorage.setItem("userImage", dataURL);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
    }
</script>

<style scoped>

</style>