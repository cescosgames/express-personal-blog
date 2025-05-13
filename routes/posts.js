import express from 'express'; // import express in our posts routing
// can move and import specific control routing functions here 
const router = express.Router(); // use express router to route
// bringing in FS and PATH modules to modify and interact with public/blogposts folder to simulate our 'database'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// need to do this to use __file/dirname in modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// our path to our public blogposts folder
const blogpostsDir = path.join(__dirname, '../public/blogposts');

// need 5 main routes here 1. get all posts 2. get a single post 3. create a new post 4. update a post 5. delete a post

// route to get all posts FROM our public blogposts directory
router.get('/', (req, res, next) => {
    // add a string query limit
    const limit = parseInt(req.query.limit);

    // add some light error handling
    if(!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit)); // if we have a limit, return the limit amount of posts
    };

    // otherwise return all 'posts'
    res.status(200).json(posts);
});

// route to get a specific post
router.get('/:id', (req, res, next) => {
    // get the post id and convert to int use request parameters
    const id = parseInt(req.params.id); 

    // then find relevant post in posts array using find matching IDs
    const post = posts.find((post) => post.id === id);

    // error handling to see if post exists
    if(!post) {
        return res.status(404).json({ msg: `Post with id ${id} not found` }); // return a 404 with short message
    };

    res.status(200).json(post); // otherwise send back the post
});

// route to create a post
router.post('/', (req, res, next) => {
    // create the new post object
    const newPost = {
        id: posts.length + 1, // simple ID system, just + 1 of most recent, might get messy with deletions
        title: req.body.title, // request body title
    };

    // simple check to see if it exists
    if(!newPost.title) {
        return res.status(404).json({ success: false, msg: `Please Provide Content To Post`});
    };

    // otherwise push it
    posts.push(newPost);

    res.status(201).json(posts); // 201 for successful creation
});

// route to update post
router.put('/:id', (req, res, next) => {
    // get the id of post to update, super similar to our get single post request
    const id = parseInt(req.params.id);
    const postToUpdate = posts.find((post) => post.id === id); 

    // check if it exists
    if(!postToUpdate) {
        return res.status(404).json({ success: false, msg: `Post with id ${id} not found` });
    }

    // otherwise, send the update
    postToUpdate.title = req.body.title;
    res.status(200).json(posts);
});

// route to delete post
router.delete('/:id', (req, res, next) => {
    // similar to put and get single post
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if(!post) {
        return res.status(404).json({ success: false, msg: `Post with id ${id} not found` });
    }

    posts = posts.filter((post) => post.id !== id) // returns all posts except matching ID
    res.status(200).json(posts);
});


export default router;