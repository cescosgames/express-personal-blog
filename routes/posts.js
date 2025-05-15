import express from 'express'; // import express in our posts routing
const router = express.Router(); // use express router to route
// our controller
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js';

// need 5 main routes here 1. get all posts 2. get a single post 3. create a new post 4. update a post 5. delete a post

// route to get all posts FROM our public blogposts directory using our controller
router.get('/', getPosts);

// route to get a specific post
router.get('/:id', getPost);

// route to create a post
router.post('/', createPost);

// route to update post
router.put('/:id', updatePost);

// route to delete post
router.delete('/:id', deletePost);


export default router;