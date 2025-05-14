import express from 'express'; // import express
import path from 'path';
import posts from './routes/posts.js' // importing our post routes
import frontend from './routes/frontend.js' // importing our front end routes
import { fileURLToPath } from 'url'; // import fileURLtoPath to use __dirname in modules

const port = process.env.PORT || 5173; // using our .env port variable, with a default fallback. Don't forget to explicitly define .env in our package.json!

// get the directory name to load static folder path
const __filename = fileURLToPath(import.meta.url); // gives ur our file URL, just like filename in commonJS
const __dirname = path.dirname(__filename); // pass in our file name to get our dirname

// initialize express
const app = express();

// body parse middleware
app.use(express.json()); // we need this in order to submit raw json

// set up static folder path
app.use(express.static(path.join(__dirname, 'public'))); // __dirname doesn't work with es modules! need to add lines

// our backend posts route
app.use('/api/posts', posts)

// our frontend posts route
app.use('/', frontend);

// 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// using vites port: NOTE, node has a bult in watch feature, similar to nodemon - see package.json dev function
app.listen(port, () => console.log(`Server started on port ${port}`));