export default class Likes {
  constructor(commentId , usersID = []) {
    this.commentId = commentId;
    this.usersID = usersID;
  }
}
