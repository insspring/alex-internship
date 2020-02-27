<template>
    <div class="userDescription">
        <div class="userInfo">
            <UserInfo class="user"></UserInfo>
            <UserSettings class="user" v-if="this.id == this.userID"></UserSettings>
        </div>
        <div class="userBooks">
            <h1>
                {{ $t("myBooks") }}
            </h1>
            <div class="userBooks">
                <router-link
                        v-for="book in books"
                        :to="'/book/' + book.id"
                        :key="book.id"
                        class="routerLink"
                >
                    <BookPreview
                            :src="book.cover"
                            :title="book.title"
                            class="bookPreview"
                    ></BookPreview>
                </router-link>
                <PageLoader
                        v-if="loader"
                        :class="{ loaderContent: this.books.length === 0 }"
                        class="loader"
                ></PageLoader>
            </div>
        </div>
    </div>
</template>

<script>
    import {getbook, getUser} from "../helpers/api";
    import UserInfo from "./userInfo";
    import UserSettings from "./userSettings";
    import PageLoader from "./PageLoader";
    import BookPreview from "./BookPreview";
    import axios from "axios";

    export default {
        name: "UserDescription",
        components: {PageLoader, UserInfo, UserSettings, BookPreview },
        data() {
            return {
                name: "",
                image: "",
                userImage: "",
                books: [],
                bottom: false,
                count: 1
            }
        },
        computed: {
            accessToken: function () {
                return localStorage.getItem("accessToken");
            },
            id: function () {
                return this.$route.params.id
            },
            userID: function () {
                return this.$store.getters.USER_ID
            },
            loader: function() {
                return this.$store.getters.LOADER;
            },
        },
        async created() {
            const responseUser = await getUser(this.id).then(result => result.data);
            this.name = responseUser.name;
            this.userImage = responseUser.image;
            const responseBook = await getbook(this.id).then(result => result.data);
            this.authorID = responseBook.authorID;
            window.addEventListener("scroll", () => {
                this.bottom = this.bottomVisible();
            });
            if (this.id && this.count) {
                this.addBook();
            }
        },
        methods: {
            bottomVisible() {
                const scrollY = window.scrollY;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible;
            },
            addBook() {
                axios.get(`/books?_sort=id&_order=desc&authorID=${this.id}&_page=${this.count}&_limit=10`).then(result => {
                    this.$store.commit("SET_LOADER", false);
                    this.count++;
                    for (let i = 0; i < result.data.length; i++) {
                        this.books.push(result.data[i]);
                    }
                });
                this.$store.commit("SET_LOADER", true);
            }
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.addBook();
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .userDescription {
        display: grid;
        grid-template-columns: 25rem 1fr;
    }

    .user {
        box-sizing: border-box;
        margin: 2rem;
        width: 20rem;
    }
</style>