<template>
    <div class="favoriteBooks">
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
</template>

<script>
    import axios from "axios";
    import PageLoader from "./PageLoader";
    import BookPreview from "./BookPreview";
    import {getUser} from "../helpers/api";

    export default {
        name: "FavoriteBooks",
        components: {PageLoader, BookPreview},
        data() {
            return {
                books: [],
                favoriteBook: []
            }
        },
        created() {
            if (this.userID) {
            const responseUser = getUser(this.userID).then(result => result.data);
            this.favoriteBook = responseUser.favoriteBooks;
            console.log(responseUser, this.userID);
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
            async addBook() {
                const responseUser = await getUser(this.userID).then(result => result.data);
                this.favoriteBook = responseUser.favoriteBooks;
                for (let i = 0; i < this.favoriteBook.length; i++) {
                    axios.get(`/books/?id=${this.favoriteBook[i]}&_sort=id&_order=desc&_page=${this.count}&_limit=10`).then(result => {
                        this.$store.commit("SET_LOADER", false);
                        this.count++;
                        for (let i = 0; i < result.data.length; i++) {
                            this.books.push(result.data[i]);
                        }
                    });
                }
                console.log(this.books)
                this.$store.commit("SET_LOADER", true);
            }
        },
        computed: {
            accessToken: function () {
                return localStorage.getItem("accessToken");
            },
            userID: function () {
                return this.$store.getters.USER_ID
            },
            loader: function () {
                return this.$store.getters.LOADER;
            },
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.addBook();
                }
            },
            userID: function (val) {
                if (val) {
                    this.addBook();
                }
            }
        }
    }
</script>

<style scoped>

</style>