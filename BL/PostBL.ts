import { DataAccess } from '../DAL/DataAccess';
import Post from '../models/Post';
import { PostDataAccessSQL } from '../DAL/PostDataAccesSQL';

export class PostBL {
    private postDataAccess: PostDataAccessSQL;

    constructor(postDataAccess: PostDataAccessSQL) {
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

    fetchPosts(offset?: number, limit?: number, text?: string, authQuery?: string) {
        const Posts = this.postDataAccess.fetch(offset, limit, text, authQuery);

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