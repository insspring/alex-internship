export default class User {
  constructor(
    name,
    email,
    password,
    image = "../../assets/default-user-image.png",
    favoriteBooks = [],
    subscribers = [],
    subscriptions = []
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
    this.favoriteBooks = favoriteBooks;
    this.subscribers = subscribers;
    this.subscriptions = subscriptions;
  }
}
