
import Post from '../models/Post';

class InMemoryDB {
  private static instance: InMemoryDB;
  private posts: Map<number, Post> = new Map();

  private constructor() { }

  public static getInstance(): InMemoryDB {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  // Post Methods
  addPost(post: Post) {
    this.posts.set(post.id, post);
  }

  getPost(id: number): Post | undefined {
    return this.posts.get(id);
  }

  updatePost(id: number, postData: Partial<Post>) {
    let post = this.posts.get(id);
    if (post) {
      // Update attributes of the post
      post = { ...post, ...postData };
      this.posts.set(id, post);
    }
  }

  deletePost(id: number) {
    this.posts.delete(id);
  }

  fetchPosts(offset?: number, limit?: number, text?: string): Post[] {
    let PostList = Array.from(this.posts.values());

    // First, filter by text if provided
    if (text) {
      PostList = PostList.filter(post => post.description.toLowerCase().includes(text.toLowerCase()));
    }

    // Then, apply paging
    if (typeof offset === 'number' && typeof limit === 'number') {
      const endIndex = offset + limit;
      PostList = PostList.slice(offset, endIndex);
    }

    return PostList;
  }


}
export default InMemoryDB;

