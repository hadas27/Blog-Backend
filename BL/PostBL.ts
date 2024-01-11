import { DataAccess } from '../DAL/DataAccess';
import { PostDataAccess } from '../DAL/PostDataAccessInMemory';
import Post from '../models/Post';

export class PostBL {
    private postDataAccess: DataAccess<Post>;

    constructor(postDataAccess: DataAccess<Post>) {
        this.postDataAccess = postDataAccess;
    }

    addPost(post: Post): void {
        try {
            this.postDataAccess.add(post);
        } catch (error) {
            throw new Error(`Unable to add Post: ${(error as Error).message}`);
        }
    }

    async getPost(postId: number): Promise<Post> {
        const Post = await this.postDataAccess.get(postId);
        if (!Post) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return Post;
    }

    fetchPosts(offset?: number, limit?: number, text?: string) {
        const Posts = this.postDataAccess.fetch(offset, limit, text);

        if (!Posts) {
            throw new Error("Posts not found");
        }

        return Posts;
    }


    updatePost(postId: number, updateData: Partial<Post>): void {
        try {
            this.postDataAccess.update(postId, updateData);
        } catch (error) {
            throw new Error(`Unable to update Post: ${(error as Error).message}`);
        }
    }

    deletePost(postId: number): void {
        try {
            this.postDataAccess.delete(postId);
        } catch (error) {
            throw new Error(`Unable to delete Post: ${(error as Error).message}`);
        }
    }
}