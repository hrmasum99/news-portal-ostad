const News = require('../models/News');
const slugify = require('slugify');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ published: true }).populate('author', 'name avatar').sort('-createdAt');
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const news = await News.find({ published: true, featured: true })
      .populate('author', 'name avatar').sort('-views').limit(limit);
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name avatar bio');
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category, published: true })
      .populate('author', 'name avatar').sort('-createdAt');
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.params.userId }).populate('author', 'name avatar').sort('-createdAt');
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, excerpt, content, category, image, tags, featured } = req.body;
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();
    
    const news = await News.create({
      title, slug, excerpt, content, category, image, tags, featured,
      author: req.user._id
    });
    
    const populatedNews = await News.findById(news._id).populate('author', 'name avatar');
    res.status(201).json({ success: true, data: populatedNews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this news' });
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author', 'name avatar');
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this news' });
    }

    await news.deleteOne();
    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.incrementView = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    res.json({ success: true, data: { views: news.views } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likeNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });

    const index = news.likes.indexOf(req.user._id);
    if (index === -1) {
      news.likes.push(req.user._id); // Like
    } else {
      news.likes.splice(index, 1); // Unlike
    }

    await news.save();
    res.json({ success: true, data: { likes: news.likes.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};