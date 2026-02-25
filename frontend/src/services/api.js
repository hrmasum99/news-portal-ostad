import axios from 'axios';

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (Zustand persist)
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTHENTICATION API EXAMPLES
// ============================================

export const authAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Get user profile
  getProfile: async (userId) => {
    try {
      const response = await api.get(`/auth/profile/${userId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch profile',
      };
    }
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/auth/profile/${userId}`, userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
      };
    }
  },
};

// ============================================
// NEWS API EXAMPLES
// ============================================

export const newsAPI = {
  // Get all news
  getAllNews: async () => {
    try {
      const response = await api.get('/news');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch news',
      };
    }
  },

  // Get top/featured news
  getTopNews: async (limit = 6) => {
    try {
      const response = await api.get(`/news/top?limit=${limit}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch top news',
      };
    }
  },

  // Get single news by ID
  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'News not found',
      };
    }
  },

  // Get news by category
  getNewsByCategory: async (category) => {
    try {
      const url = category === 'All' ? '/news' : `/news/category/${category}`;
      const response = await api.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch news by category',
      };
    }
  },

  // Create new news (requires authentication)
  createNews: async (newsData) => {
    try {
      const response = await api.post('/news', newsData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create news',
      };
    }
  },

  // Update existing news (requires authentication)
  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/news/${id}`, newsData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update news',
      };
    }
  },

  // Delete news (requires authentication)
  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/news/${id}`);
      return {
        success: true,
        message: 'News deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete news',
      };
    }
  },

  // Get user's news
  getUserNews: async (userId) => {
    try {
      const response = await api.get(`/news/user/${userId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user news',
      };
    }
  },

  // Like/Unlike news
  toggleLike: async (newsId) => {
    try {
      const response = await api.post(`/news/${newsId}/like`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to like news',
      };
    }
  },

  // Increment view count
  incrementView: async (newsId) => {
    try {
      const response = await api.post(`/news/${newsId}/view`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to increment view',
      };
    }
  },
};

// ============================================
// CONTACT API EXAMPLE
// ============================================

export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return {
        success: true,
        message: response.data.message || 'Message sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send message',
      };
    }
  },
};

// ============================================
// FILE UPLOAD EXAMPLE (if needed)
// ============================================

export const uploadAPI = {
  // Upload image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data, // Should return { url: 'image-url' }
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to upload image',
      };
    }
  },
};

// ============================================
// USAGE IN COMPONENTS
// ============================================

/*
// Example: Using in a component

import { newsAPI } from './services/api';

const MyComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await newsAPI.getAllNews();
      
      if (response.success) {
        setNews(response.data);
      } else {
        console.error(response.message);
      }
      
      setLoading(false);
    };

    fetchNews();
  }, []);

  // Rest of component...
};
*/

// ============================================
// BACKEND ROUTE STRUCTURE REFERENCE
// ============================================

/*
Your Express.js backend should have these routes:

// routes/auth.js
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);

// routes/news.js
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

// routes/contact.js
router.post('/', submitContact);

// routes/upload.js (optional)
router.post('/image', protect, uploadImage);

// In your main server file (index.js or app.js):
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
*/

// ============================================
// MONGODB SCHEMA REFERENCE
// ============================================

/*
// User Schema (models/User.js)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  bio: { type: String },
  avatar: { type: String, default: 'default-avatar-url' },
  createdAt: { type: Date, default: Date.now },
});

// News Schema (models/News.js)
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Contact Schema (models/Contact.js)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
*/

// ============================================
// HELPER FUNCTIONS (Required by UI Components)
// ============================================

export const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const getReadingTime = (content) => {
  if (!content) return '1 min read';
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default api;