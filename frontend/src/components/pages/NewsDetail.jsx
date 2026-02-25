import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaEye,
  FaHeart,
  FaShare,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { useAuthStore } from "../../store";
import { newsAPI, formatDate, getReadingTime } from "../../services/api";
import Loading from '../common/Loading';
import NewsCard from '../common/NewsCard';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await newsAPI.getNewsById(id);
        if (response.success) {
          setNews(response.data);
          const allNewsRes = await newsAPI.getNewsByCategory(response.data.category);
          if (allNewsRes.success) {
            const related = allNewsRes.data
              .filter((item) => item._id !== id)
              .slice(0, 3);
            setRelatedNews(related);
          }
        } else {
          navigate('/news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLiked(!liked);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await newsAPI.deleteNews(id);
        navigate('/profile');
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = news?.title;

  const socialShare = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (loading) return <Loading fullScreen />;
  if (!news) return null;

  const isAuthor = isAuthenticated && user?._id === news.author._id;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container-custom mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-dark-600 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <article className="container-custom max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/news?category=${news.category}`}
            className="badge bg-primary-600 text-white text-base hover:bg-primary-700 transition-colors"
          >
            {news.category}
          </Link>

          {isAuthor && (
            <div className="flex items-center space-x-2">
              <Link
                to={`/profile/edit-news/${news._id}`}
                className="p-2 hover:bg-primary-50 rounded-lg transition-colors text-primary-600"
                title="Edit"
              >
                <FaEdit className="text-xl" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                title="Delete"
              >
                <FaTrash className="text-xl" />
              </button>
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900 mb-6 leading-tight animate-slide-up">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-dark-200 mb-8 animate-slide-up animation-delay-200">
          <div className="flex items-center space-x-3">
            <img
              src={news.author.avatar}
              alt={news.author.name}
              className="w-12 h-12 rounded-full border-2 border-primary-500"
            />
            <div>
              <p className="font-semibold text-dark-900">{news.author.name}</p>
              <p className="text-sm text-dark-500">{news.author.bio}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-dark-600">
            <FaClock />
            <span>{formatDate(news.createdAt)}</span>
          </div>

          <div className="flex items-center space-x-1 text-dark-600">
            <span>{getReadingTime(news.content)}</span>
          </div>

          <div className="flex items-center space-x-1 text-dark-600">
            <FaEye />
            <span>{news.views.toLocaleString()} views</span>
          </div>
        </div>

        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12 animate-scale-in">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-dark-700 leading-relaxed mb-6 text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {news.tags.map((tag) => (
              <span
                key={tag}
                className="badge bg-dark-100 text-dark-700 hover:bg-dark-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between py-8 border-y border-dark-200">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              liked
                ? 'bg-primary-600 text-white'
                : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
            }`}
          >
            <FaHeart />
            <span>{news.likes + (liked ? 1 : 0)} Likes</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-dark-100 text-dark-700 hover:bg-dark-200 transition-colors"
            >
              <FaShare />
              <span>Share</span>
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl p-4 flex space-x-3 animate-scale-in border border-dark-100">
                <a
                  href={socialShare.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={socialShare.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href={socialShare.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            )}
          </div>
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className="container-custom mt-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map((newsItem) => (
              <NewsCard key={newsItem._id} news={newsItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;