export default class Comment {
  constructor(comment, bookID, userID, likes = [], date = Date.now()) {
    this.comment = comment;
    this.bookID = bookID;
    this.userID = userID;
    this.likes = likes
    this.date = date;
  }
}
