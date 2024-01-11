import { Request, Response } from 'express';
import Post from '../models/Post';
import { PostBL } from '../BL/PostBL';
import { text } from 'stream/consumers';

export class PostController {
    private postBL: PostBL;

    constructor(postBL: PostBL) {
        this.postBL = postBL;
    }


    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        const post = new Post(postData.id, postData.title, postData.img_url, postData.description);
        try {
            await this.postBL.addPost(post);
            res.status(201).send({ message: `Post created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            const post = await this.postBL.getPost(postId);
            res.status(200).send(post);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }


    async getPosts(req: Request, res: Response) {
        try {
            const from = parseInt(req.query.from as string);
            const to = parseInt(req.query.to as string);
            const text = req.query.text as string

            // Validate 'from' and 'to' values; if invalid, set to undefined
            const validFrom = !isNaN(from) ? from : undefined;
            const validTo = !isNaN(to) ? to : undefined;
            // Calculate 'offset' and 'limit' based on valid 'from' and 'to'
            const validText = text ? text : undefined
            const offset = validFrom ? validFrom - 1 : undefined;
            const limit = (validFrom && validTo) ? validTo - validFrom : undefined;

            // Fetch posts with or without pagination
            const posts = await this.postBL.fetchPosts(offset, limit, validText);
            const formattedPosts = posts.map(post => ({ id: post.id, title: post.title, img_url: post.img_url }));

            res.json(formattedPosts);
        }
        catch (error) {
            res.status(400).send((error as Error).message);
        }
    }


    // getPosts(req: Request, res: Response) {
    //     if (req.from && req.to && req.from < req.to) {
    //         const offset = req.from - 1;
    //         const limit = req.to - req.from;
    //         const posts = dataSource.fetchPosts(offset, limit);
    //     }
    //     else {
    //         const posts = dataSource.fetchPosts();
    //     }
    //     res.json(posts.map(post => ({ id: post.id, title: post.title, img_url: post.img_url })));

    // }




    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        const postData = req.body;
        try {
            await this.postBL.updatePost(postId, postData);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        try {
            await this.postBL.deletePost(postId);
            res.status(200).send({ message: `Post ${postId} deleted successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
}
