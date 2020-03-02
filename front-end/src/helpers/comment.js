export default class Comment {
  constructor(comment, userID) {
    this.comment = comment;
    this.userID = userID;
    this.date = Date.now();
  }
}
