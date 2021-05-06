class FileController {
  async saveFile(ctx, next) {
    console.log(ctx)
  }
}

module.exports = new FileController()
