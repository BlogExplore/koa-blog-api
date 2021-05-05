class FileController {
  async saveFile(ctx, next) {
    console.log(ctx.req.file)
  }
}

module.exports = new FileController()
