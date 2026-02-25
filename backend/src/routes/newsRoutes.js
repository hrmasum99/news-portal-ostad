const express = require('express');
const router = express.Router();
const { getAllNews, getTopNews, getNewsById, getNewsByCategory, getUserNews, createNews, updateNews, deleteNews, incrementView, likeNews } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllNews);
router.get('/top', getTopNews);
router.get('/category/:category', getNewsByCategory);
router.get('/user/:userId', getUserNews);
router.get('/:id', getNewsById);

router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);
router.post('/:id/like', protect, likeNews);
router.post('/:id/view', incrementView); 

module.exports = router;