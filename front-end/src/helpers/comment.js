export default class Comment {
  constructor(comment, bookID, userID, date = Date.now()) {
    this.comment = comment;
    this.bookId = bookID;
    this.userID = userID;
    this.date = date;
  }
}
