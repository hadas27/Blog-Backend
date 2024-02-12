class Post {
  id: number;
  title: string;
  // img_url: string;
  description: string;
  postedBy: number;

  constructor(id: number, title: string, description: string, postedBy: number) {
    this.id = id;
    this.title = title;
    // this.img_url = img_url;
    this.description = description;
    this.postedBy= postedBy;
  }
}
export default Post;