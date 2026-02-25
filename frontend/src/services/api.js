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
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data; // Backend already sends { success: true, data: {...} }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  },

  getProfile: async (userId) => {
    try {
      const response = await api.get(`/auth/profile/${userId}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/auth/profile/${userId}`, userData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update profile' };
    }
  },
};

// ============================================
// NEWS API EXAMPLES
// ============================================

export const newsAPI = {
  getAllNews: async () => {
    try {
      const response = await api.get('/news');
      return response.data; 
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch news' };
    }
  },

  getTopNews: async (limit = 6) => {
    try {
      const response = await api.get(`/news/top?limit=${limit}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch top news' };
    }
  },

  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'News not found' };
    }
  },

  getNewsByCategory: async (category) => {
    try {
      const url = category === 'All' ? '/news' : `/news/category/${category}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch news by category' };
    }
  },

  createNews: async (newsData) => {
    try {
      const response = await api.post('/news', newsData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create news' };
    }
  },

  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update news' };
    }
  },

  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete news' };
    }
  },

  getUserNews: async (userId) => {
    try {
      const response = await api.get(`/news/user/${userId}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch user news' };
    }
  },

  toggleLike: async (newsId) => {
    try {
      const response = await api.post(`/news/${newsId}/like`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to like news' };
    }
  },

  incrementView: async (newsId) => {
    try {
      const response = await api.post(`/news/${newsId}/view`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to increment view' };
    }
  },
};

// ============================================
// CONTACT API EXAMPLE
// ============================================

export const contactAPI = {
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to send message' };
    }
  },
};

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