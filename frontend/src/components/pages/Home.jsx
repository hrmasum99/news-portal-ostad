import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFire, FaChartLine, FaNewspaper, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuthStore, useNewsStore } from "../../store";
import { newsAPI } from '../../services/api';
import NewsCard from '../common/NewsCard';
import Loading from '../common/Loading';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [latestNewsPage, setLatestNewsPage] = useState(1);
  const [latestNewsTotalPages, setLatestNewsTotalPages] = useState(1);
  const [latestNewsData, setLatestNewsData] = useState([]);
  const { topNews, news, categories, setTopNews, setNews } = useNewsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topNewsRes, allNewsRes] = await Promise.all([
          newsAPI.getTopNews(7),
          newsAPI.getAllNews(1, 6), 
        ]);

        if (topNewsRes.success) {
          const topNewsArray = topNewsRes.data.news || topNewsRes.data;
          setTopNews(topNewsArray);
        }
        
        if (allNewsRes.success) {
          const newsArray = allNewsRes.data.news || allNewsRes.data;
          setNews(newsArray);
          setLatestNewsData(newsArray);
          
          // Handle pagination data
          if (allNewsRes.data.pagination) {
            setLatestNewsTotalPages(allNewsRes.data.pagination.pages);
          } else {
            setLatestNewsTotalPages(1);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTopNews, setNews]);

  // Fetch latest news when page changes
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await newsAPI.getAllNews(latestNewsPage, 6);
        if (response.success) {
          const newsArray = response.data.news || response.data;
          setLatestNewsData(newsArray);
          
          // Handle pagination data
          if (response.data.pagination) {
            setLatestNewsTotalPages(response.data.pagination.pages);
          }
          
          window.scrollTo({ top: document.getElementById('latest-news-section')?.offsetTop - 100, behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    if (latestNewsPage > 1) {
      fetchLatestNews();
    }
  }, [latestNewsPage]);

  if (loading) return <Loading fullScreen />;

  const heroNews = topNews[0];
  const gridNews = topNews.slice(1, 6);
  const latestNews = latestNewsData;
  const trendingNews = news.filter(n => n.views > 2000).slice(0, 4);

  const handleLatestNewsPageChange = (page) => {
    setLatestNewsPage(page);
  };

  const handleLatestNewsPrev = () => {
    if (latestNewsPage > 1) {
      setLatestNewsPage(latestNewsPage - 1);
    }
  };

  const handleLatestNewsNext = () => {
    if (latestNewsPage < latestNewsTotalPages) {
      setLatestNewsPage(latestNewsPage + 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroNews?.image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-white"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight animate-slide-up">
              Stay Informed, Stay Ahead
            </h1>
            <p className="text-xl md:text-2xl text-dark-100 mb-8 animate-slide-up animation-delay-200">
              Breaking news, insightful analysis, and diverse perspectives from around the globe
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
              <Link to="/news" className="btn-primary text-lg px-8 py-4">
                Explore News <FaArrowRight className="inline ml-2" />
              </Link>
              <Link to="/register" className="btn-outline bg-white/10 backdrop-blur-sm text-white border-white text-lg px-8 py-4">
                Join Community
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Top News Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center space-x-3 mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900">Top Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="flex flex-col gap-8">

              {gridNews[0] && (
                <div className="h-[550px]">
                  <NewsCard news={gridNews[0]} featured={true} />
                </div>
              )}
              
              {gridNews[1] && (
                <NewsCard news={gridNews[1]} />
              )}
              
              {gridNews[2] && (
                <div className="h-[200px] overflow-hidden rounded-2xl group border border-dark-100">

                  <div className="transform scale-95 origin-top">
                      <NewsCard news={gridNews[2]} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-8">
              {gridNews.slice(3, 5).map((newsItem) => (
                <div key={newsItem._id}>
                  <NewsCard news={newsItem} />
                </div>
              ))}
              
              <div className="bg-primary-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border-2 border-dashed border-primary-200">
                <h3 className="text-xl font-bold text-primary-900 mb-2">Want to see more?</h3>
                <p className="text-primary-700 mb-4">Explore all our latest trending stories.</p>
                <Link to="/news" className="btn-primary py-2 px-6">View All</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore By Category
            </h2>
            <p className="text-dark-300 text-lg">
              Find news that matters to you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/news?category=${category}`}
                className="group relative overflow-hidden rounded-xl bg-dark-800 hover:bg-primary-600 p-6 text-center transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <FaNewspaper className="text-4xl mx-auto mb-3 text-primary-500 group-hover:text-white transition-colors" />
                  <h3 className="font-bold text-lg">{category}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="latest-news-section" className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <FaNewspaper className="text-3xl text-primary-600" />
                <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900">
                  Latest News
                </h2>
              </div>
              <p className="text-dark-600 text-lg">Fresh stories updated daily</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((newsItem) => (
              <NewsCard key={newsItem._id} news={newsItem} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/news" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
              <span>View All News</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-gradient-to-b from-dark-50 to-white">
        <div className="container-custom">
          <div className="flex items-center space-x-3 mb-12">
            <FaChartLine className="text-3xl text-primary-600" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900">
              Trending Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingNews.map((newsItem, index) => (
              <Link
                key={newsItem._id}
                to={`/news/${newsItem._id}`}
                className="group flex space-x-4 p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex-shrink-0">
                  <div className="text-5xl font-display font-black text-primary-600/20 group-hover:text-primary-600/40 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="badge bg-primary-100 text-primary-700 mb-2">
                    {newsItem.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {newsItem.title}
                  </h3>
                  <p className="text-dark-600 text-sm line-clamp-2">
                    {newsItem.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 mt-3 text-xs text-dark-500">
                    <span>{newsItem.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{newsItem?.likes?.length || 0} likes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Create an account to publish your own news, save articles, and connect with other readers
          </p>
          <Link
            to="/register"
            className="btn-outline bg-white text-primary-600 border-white hover:bg-primary-50 text-lg px-8 py-4 inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;