class Post {
  id: number;
  title: string;
  description: string;
  postedBy: number;

  constructor(id: number, title: string, description: string, postedBy: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.postedBy= postedBy;
  }
}
export default Post;