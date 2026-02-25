import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuthStore, useNewsStore } from "../../store";
import { newsAPI } from '../../services/api';
import NewsCard from '../common/NewsCard';
import Loading from '../common/Loading';

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const itemsPerPage = 12;

  const { news, categories, selectedCategory, setNews, setSelectedCategory } = useNewsStore();

  // Get category from URL params
  const urlCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setSelectedCategory(urlCategory);
    setCurrentPage(1); // Reset to page 1 when category changes
  }, [urlCategory, setSelectedCategory]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsAPI.getNewsByCategory(selectedCategory, currentPage, itemsPerPage);
        if (response.success) {
          // Handle different response structures
          if (response.data.pagination) {
            // Paginated response from getAllNews
            setNews(response.data.news);
            setTotalPages(response.data.pagination.pages);
            setTotalNews(response.data.pagination.total);
          } else if (Array.isArray(response.data)) {
            // Non-paginated response from getNewsByCategory
            setNews(response.data);
            setTotalPages(1);
            setTotalNews(response.data.length);
          } else {
            // Fallback
            setNews(response.data.news || response.data);
            setTotalPages(1);
            setTotalNews(response.data.length);
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, currentPage, setNews]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when changing category
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Filter news by search query (client-side filtering)
  const filteredNews = news.filter((newsItem) => {
    const matchesSearch =
      searchQuery === '' ||
      newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsItem.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-dark-50 to-white">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-4">
            All News
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Stay updated with the latest stories from around the world
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-dark-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary flex items-center justify-center space-x-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <div
            className={`mt-6 pt-6 border-t border-dark-100 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center mb-4">
              <FaFilter className="text-dark-600 mr-2" />
              <span className="font-semibold text-dark-700">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-dark-600">
            Showing <span className="font-semibold text-dark-900">{filteredNews.length}</span> of{' '}
            <span className="font-semibold text-dark-900">{totalNews}</span> results
            {searchQuery && (
              <span>
                {' '}
                for "<span className="font-semibold text-primary-600">{searchQuery}</span>"
              </span>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-dark-600 text-sm">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* News Grid */}
        {loading ? (
          <Loading />
        ) : filteredNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((newsItem, index) => (
                <div
                  key={newsItem._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCard news={newsItem} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    currentPage === 1
                      ? 'bg-dark-100 text-dark-400 cursor-not-allowed'
                      : 'bg-white text-dark-700 hover:bg-primary-600 hover:text-white shadow-md'
                  }`}
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center space-x-2">
                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? 'bg-primary-600 text-white shadow-lg scale-110'
                          : page === '...'
                          ? 'bg-transparent text-dark-400 cursor-default'
                          : 'bg-white text-dark-700 hover:bg-dark-100 shadow-md'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Mobile Page Indicator */}
                <div className="sm:hidden px-4 py-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-dark-700">
                    {currentPage} / {totalPages}
                  </span>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    currentPage === totalPages
                      ? 'bg-dark-100 text-dark-400 cursor-not-allowed'
                      : 'bg-white text-dark-700 hover:bg-primary-600 hover:text-white shadow-md'
                  }`}
                >
                  <span>Next</span>
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">
              No news found
            </h3>
            <p className="text-dark-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;