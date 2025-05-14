# Express Personal Blog (backend)

This is a simple Personal Blog Unit based on the [roadmap.sh Personal Blog project](https://roadmap.sh/projects/personal-blog). This little blog allows users to write, publish,
edit and delete articles (as admin) or view articles as a guest. Guests can view the home page listing all articles or the article page displaying the article itself. Admins
can view a dashboard featuring all written articles along with the option to add, edit, or delete an article as well as logout their current authorized session.
<br>
<br>

## How it was made:

**Tech used:** 
- ExpressJS used to set up API routes for managing blog posts and serving frontend html from local environment
- Base64 to decode HTTP authorization headers for managing authentication
- HTML, CSS, and JS for frontend functionality

## Visual Examples
<br> Home page "/home" <br>
<img width="668" alt="Screenshot 2025-04-30 at 15 15 04" src="/public/images/homepage.png" />
<br> Admin page "/admin" <br>
<img width="668" alt="Screenshot 2025-04-30 at 15 15 04" src="/public/images/adminpage.png" />
<br> Create page "/new" <br>
<img width="668" alt="Screenshot 2025-04-30 at 15 15 04" src="/public/images/createpage.png" />
<br> Edit page "/edit/:id" <br>
<img width="668" alt="Screenshot 2025-04-30 at 15 15 04" src="/public/images/editpage.png" />

## How To Run The Project

1. Download the files onto your local environment or copy this repo and navigate into the folder you downloaded them into
```
cd express-personal-blog
```
2. Open in your preferred IDE and install dependencies
```
npm install
```
3. In your integrated terminal, call npm run dev
```
npm run dev
```
4. In your browser, navigate to local host 5173 or create a new .env file to store desired port

## Features:

Following the project guidelines, this project features...
1. Simple storage using filesystem to store the articles. Stored articles are stored in JSON and contain title, content, and publication date
2. Functional backend that delivers all the frontend and handles form submissions for Creating, Reading, Updating, and Deleting data
3. Just HTML, CSS, and JS on the front end, no frameworks
4. Standard HTTP basic authentication for admin pages

## Lessons Learned:
Definitely one of the denser beginner projects I've done here so far! Wasn't expecting it to be so complex. At it's core, routing the backend was actually quite straightforward
with the handling the main functions. Express really does simplify the process. Delivering the frontend however was something I had no experience in before so it definitely took
some getting used too. Same for authentication. Lots of new things learned in this project! 
<br>
Very happy with how the post routing and main server.js were set up. Definitely room for improvement, including creating a controller script to clean up the posts routes. Error
validation also could stand to be improved but for the time being it gets the job done. 
<br>
Less happy with the frontend and authentication. For the frontend, I just didn't want to spend much time since that wasn't the focus of this project and for authentication, I 
still have lots to learn as this project was my first real experience with this process. 
<br>
Overall though, while there is room for improvement, I am happy with the current state and believe my approach makes sense and can be followed through the comments. I also plan
on adding a general approach note on how this project was tackled, probably in the server.js file.
