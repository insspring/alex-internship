<template>
    <div class="userProfile">
        <HeaderLayout></HeaderLayout>
        <UserInfo class="user"></UserInfo>
        <UserSettings class="user"></UserSettings>
    </div>
</template>

<script>
    /*import { signinUser } from "../helpers/api";*/
    import HeaderLayout from "../components/HeaderLayout";
    import UserSettings from "../components/userSettings";
    import UserInfo from "../components/userInfo";
    export default {
        name: "UserProfile",
        components: {UserInfo, UserSettings, HeaderLayout}
    }
</script>

<style lang="scss" scoped>
.user {
    box-sizing: border-box;
    margin: 2rem;
    width: 20rem;
}
</style>