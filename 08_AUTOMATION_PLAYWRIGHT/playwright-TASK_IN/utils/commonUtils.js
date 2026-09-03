class CommonUtils {
  static async wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}

module.exports = CommonUtils;