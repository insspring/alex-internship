export default class Book {
  constructor(
    title,
    author = "Unknown",
    description,
    hashtags = [],
    review = [],
    cover,
    authorID
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.hastags = hashtags.length > 0 ? hashtags.split(" ") : hashtags;
    this.review = review;
    this.cover = cover;
    this.authorID = authorID;
    this.date = Date.now();
  }
}
