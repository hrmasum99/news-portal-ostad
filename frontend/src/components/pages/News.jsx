import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useNewsStore } from "../../store";
import { newsAPI } from "../../services/api";
import NewsCard from '../common/NewsCard';
import Loading from '../common/Loading';

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { news, categories, selectedCategory, setNews, setSelectedCategory } = useNewsStore();

  // Get category from URL params
  const urlCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory, setSelectedCategory]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsAPI.getNewsByCategory(selectedCategory);
        if (response.success) {
          setNews(response.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, setNews]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Filter news by search query
  const filteredNews = news.filter((newsItem) => {
    const matchesSearch =
      searchQuery === '' ||
      newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsItem.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
            Showing <span className="font-semibold text-dark-900">{filteredNews.length}</span> results
            {searchQuery && (
              <span>
                {' '}
                for "<span className="font-semibold text-primary-600">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* News Grid */}
        {loading ? (
          <Loading />
        ) : filteredNews.length > 0 ? (
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