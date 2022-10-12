export default class QuizDTO {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.ownerName = data.ownerName
    this.ownerId = data.ownerId
    this.logoPath = data.logoPath
  }
}
