class Post {
  id: number;
  title: string;
  img_url: string;
  description: string;

  constructor(id: number, title: string, img_url: string, description: string) {
    this.id = id;
    this.title = title;
    this.img_url = img_url;
    this.description = description;
  }
}
export default Post;