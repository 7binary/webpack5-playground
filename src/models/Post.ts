export default class Post {
  private date: Date;

  constructor(private title: string, private imgAsset: string) {
    this.date = new Date();
  }

  toString() {
    return JSON.stringify({
      title: this.uppercaseTitle,
      date: this.date.toLocaleDateString(),
      imgAsset: this.imgAsset,
    }, null, 2);
  }

  get uppercaseTitle() {
    return this.title.toUpperCase();
  }
}
