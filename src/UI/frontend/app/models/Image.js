export default class Image {

  constructor(img_base64, fileExt) {
      this.img_base64 = img_base64;
      this.fileExt = fileExt;
  }

  getDataImageUri() {
    return `data:${this.fileExt};base64,${this.img_base64}`;
  }

  getCSSImageUrl() {
    return `url(${this.getDataImageUri()})`;
  }
}
