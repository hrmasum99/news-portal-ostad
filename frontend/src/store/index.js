import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData, authToken) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// News Store
export const useNewsStore = create((set, get) => ({
  news: [],
  topNews: [],
  categories: ['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science'],
  selectedCategory: 'All',
  loading: false,
  error: null,

  setNews: (newsData) => set({ news: newsData }),
  
  setTopNews: (newsData) => set({ topNews: newsData }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setLoading: (status) => set({ loading: status }),
  
  setError: (error) => set({ error }),

  addNews: (newsItem) => {
    set({ news: [newsItem, ...get().news] });
  },

  updateNews: (newsId, updatedData) => {
    set({
      news: get().news.map((item) =>
        item._id === newsId ? { ...item, ...updatedData } : item
      ),
    });
  },

  deleteNews: (newsId) => {
    set({
      news: get().news.filter((item) => item._id !== newsId),
    });
  },

  getNewsById: (newsId) => {
    return get().news.find((item) => item._id === newsId);
  },

  getUserNews: (userId) => {
    return get().news.filter((item) => item.author._id === userId);
  },
}));

// UI Store
export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  theme: 'light',
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));