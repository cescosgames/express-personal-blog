import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authMiddleware from '../middleware/auth.js'
const router = express.Router();
// moving frontend routing here

const __filename = fileURLToPath(import.meta.url); // remember, we have to do this because are using import module
const __dirname = path.dirname(__filename);

// our get for our article page
router.get('/article/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'article.html'));
});

router.get('/article', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'article.html'));
});

router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'new.html'));
});

router.get('/admin', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});

router.get('/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'edit.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

export default router;