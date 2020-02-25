<template>
    <div class="addBook">
        <div class="popup" v-if="popup">
            <p>
                {{ actionBook }}
            </p>
        </div>
        <h2>{{ action }}!</h2>
        <div class="book">
            <label class="book-label">
                <p>
                    {{ $t("title") }}
                </p>
                <input class="title addBooksInput" type="text" v-model="title" />
            </label>
            <label class="book-label">
                <p>
                    {{ $t("author") }}
                </p>
                <input class="title addBooksInput" type="text" v-model="author" />
            </label>
            <label class="book-label">
                <p>
                    {{ $t("description") }}
                </p>
                <textarea
                        v-model="description"
                        class="addBooksInput addBooksTextArea"
                ></textarea>
            </label>
            <label class="book-label">
                <p>
                    {{ $t("hashtags") }}
                </p>
                <textarea
                        v-model="hashtags"
                        class="addBooksInput addBooksTextArea"
                ></textarea>
            </label>
            <label class="book-label">
                <p>
                    {{ $t("cover") }}
                </p>
                <input type="file" @change="previewFiles" />
            </label>
            <ButtonGreen
                    :text="button"
                    :method="addBooks"
                    class="button--green"
            >
            </ButtonGreen>
        </div>
    </div>
</template>

<script>
    import {addbook, getbook} from "../helpers/api";
    import ButtonGreen from "./ButtonGreen";

    export default {
        name: "AddBook",
        components: {ButtonGreen},
        data: function() {
            return {
                book: [],
                title: "",
                author: "",
                description: "",
                hashtags: "",
                cover: "",
                popup: false,
                id: this.$router.currentRoute.params["id"],
            }
        },
        async created() {
            const response = await getbook(this.id).then(result => result.data);
            this.title = response.title;
            this.author = response.author;
            this.description = response.description;
            this.hashtags = response.hashtags;
        },
        methods: {
            addBooks() {
                this.createBooks();
                addbook(this.book);
                this.book = [];
                    this.title = "";
                    this.author = "";
                    this.description = "";
                    this.hashtags = "";
                    this.cover = "";
                    this.popup = true;
                    setTimeout(() => this.popup = false, 3000)
            },
            createBooks() {
                this.book = {
                    title: this.title,
                    author: this.author,
                    description: this.description,
                    hashtags: this.hashtags.split(", "),
                    review: [],
                    cover: localStorage.getItem("bookImage"),
                    authorID: this.$store.getters.USER_ID,
                    date: Date.now(),
                };
            },
            previewFiles(event) {
                if (event.target.files[0]) {
                    let reader = new FileReader();
                    var input = event.target;
                    let dataURL;
                    reader.onload = function () {
                        dataURL = reader.result;
                        localStorage.setItem("bookImage", dataURL);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            },
        },
        props: {
            action: {
                type: String,
                required: true
            },
            button: {
                type: String,
                required: true
            },
            actionBook: {
                type: String,
                required: true
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";
    @import "../scss/_mixins.scss";

    .addBooks {
        background-color: $c-cornsilk;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        margin: 5rem auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        width: 20rem;
        z-index: 103;
    }

    .book {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    .book-label {
        margin: 0 auto;
    }

    .button--green {
        background-color: $c-mediumseagreen;
        color: #fff;

        &:hover {
            background-color: $c-brightgreen;
        }
    }

    .addBooksInput {
        box-sizing: border-box;
        border: none;
        height: 1.5rem;
        width: 15rem;
    }

    .addBooksTextArea {
        height: 5rem;
        resize: none;
    }

    .popup {
        background-color: $c-lightgray;
        border-radius: 1rem;
        left: 40rem;
        position: fixed;
        top: 15rem;
        width: 10rem;
    }
</style>