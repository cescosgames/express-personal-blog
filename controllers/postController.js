// bringing in FS and PATH modules to modify and interact with public/blogposts folder to simulate our 'database'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// need to do this to use __file/dirname in modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// our path to our public blogposts folder
const blogpostsDir = path.join(__dirname, '../public/blogposts');

// @desc GET all posts
// @route GET /api/posts

export const getPosts = (req, res, next) => {
    // use fs to read our directory
    fs.readdir(blogpostsDir, (err, files) => {
        if (err) { // if we got an error
            return res.status(500).json({ error: 'Failed to read blog posts directory' });
        };

        // map over our files to get our posts
        const posts = files.map(file => {
            const content = fs.readFileSync(path.join(blogpostsDir, file), 'utf-8'); // get our content from our file at the path, encoded in utf8
            return JSON.parse(content); // return the parsed content
        });

        res.status(200).json(posts);
    });
}

// @desc get single post
// @route GET api/posts/:id

export const getPost = (req, res, next) => {
    // get the post by going through the file path
    const postPath = path.join(blogpostsDir, `post${req.params.id}.json`); // returns something like post1 since posts will be labeled as such

    if(!fs.existsSync(postPath)) { // if this filepath doesn't exist
        return res.status(404).json({ error: `Post with id ${req.params.id} not found`});
    };

    const content = fs.readFileSync(postPath, 'utf-8'); // get our post with readFile through our path, utf8 encoding

    res.json(JSON.parse(content)); // send it back
};

// @desc create a post
// @route POST api/posts

export const createPost = (req, res, next) => {
    // destructure our content
    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(404).json({ error: 'Title and content are required to create a post' });
    }

    fs.readdir(blogpostsDir, (err, files) => {
        if (err) { // if we got an error
            return res.status(500).json({ error: 'Failed to load blog posts directory' });
        };

        // get the last blog post from our directory and it's path
        const lastFile = files[files.length-1];
        if(!lastFile) {
            const id = 1;
            const MSdate = Date.now();
            const dateObj = new Date(MSdate)
            // format date time here before sending to json
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // remember, months are 0-indexed
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();

            const date = `${month}/${day}/${year}`;
            
            const newPost = { id, title, content, date };
            const newPostPath = path.join(blogpostsDir, `post${id}.json`); // our post submission 

            fs.writeFileSync(newPostPath, JSON.stringify(newPost, null, 2)); // writing our new post to our file path

            res.status(201).json(newPost); // 201 successfully created!
            return;
        }
        // otherwise, get the file path
        const lastFilePath = path.join(blogpostsDir, lastFile);

        // and read it into JSON so we can extract id
        fs.readFile(lastFilePath, 'utf-8', (err, data) => {
            try {
                const post = JSON.parse(data);
                const lastID = post.id;
                const id = lastID + 1;
                const MSdate = Date.now();
                const dateObj = new Date(MSdate)
                // format date time here before sending to json
                const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // remember, months are 0-indexed
                const day = String(dateObj.getDate()).padStart(2, '0');
                const year = dateObj.getFullYear();

                const date = `${month}/${day}/${year}`;
                
                const newPost = { id, title, content, date };
                const newPostPath = path.join(blogpostsDir, `post${id}.json`); // our post submission 

                fs.writeFileSync(newPostPath, JSON.stringify(newPost, null, 2)); // writing our new post to our file path

                res.status(201).json(newPost); // 201 successfully created!
            } catch (error) {
                return res.status(500).json({ error: `Failed to find previous blog post ID` });
            }
        });
    });
}

// @desc update a post
// @route PUT api/posts/:id

export const updatePost = (req, res, next) => {
    // similar approach to get single post, find using filepath for our current situation
    const postPath = path.join(blogpostsDir, `post${req.params.id}.json`);

    if(!fs.existsSync(postPath)) { // if our filepath doesn't exist
        return res.status(404).json({ error: `Post with id ${id} not found`});
    };

    const updatedPost = {...JSON.parse(fs.readFileSync(postPath, 'utf-8')), ...req.body }; // add the updated body and overwrite
    fs.writeFileSync(postPath, JSON.stringify(updatedPost, null, 2));

    res.json(updatedPost);
};

// @desc delete a post
// @route DELETE api/posts/:id

export const deletePost = (req, res, next) => {
    // similar to put and get single post
    const postPath = path.join(blogpostsDir, `post${req.params.id}.json`);

    if(!fs.existsSync(postPath)) { // if our filepath doesn't exist
        return res.status(404).json({ error: `Post with id ${id} not found`});
    };

    fs.unlinkSync(postPath); // removes a file
    res.status(200).json({ message: 'Post Deleted '});
}