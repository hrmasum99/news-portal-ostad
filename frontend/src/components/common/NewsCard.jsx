import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaHeart, FaUser } from 'react-icons/fa';
import { useAuthStore } from '../../store';
import { formatDate, getReadingTime, truncateText } from '../../services/api';

const NewsCard = ({ news, featured = false }) => {
  const { user } = useAuthStore();
  const isLikedByMe = user && news?.likes?.includes(user._id);
  if (featured) {
    return (
      <Link
        to={`/news/${news._id}`}
        className="group block relative overflow-hidden rounded-2xl h-[500px] card hover:scale-[1.02] transition-transform duration-500"
      >
        <div className="absolute inset-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="mb-3">
            <span className="badge bg-primary-600 text-white">
              {news.category}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight group-hover:text-primary-400 transition-colors">
            {news.title}
          </h2>

          <p className="text-dark-100 text-lg mb-4 line-clamp-2">
            {news.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-dark-200 text-sm">
            <div className="flex items-center space-x-2">
              <img
                src={news.author.avatar}
                alt={news.author.name}
                className="w-8 h-8 rounded-full border-2 border-white/50"
              />
              <span>{news.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock />
              <span>{formatDate(news.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEye />
              <span>{news.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${news._id}`}
      className="group card hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="badge bg-primary-600 text-white">
            {news.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-dark-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {news.title}
        </h3>

        <p className="text-dark-600 mb-4 line-clamp-3">
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-dark-100">
          <div className="flex items-center space-x-2">
            <img
              src={news.author.avatar}
              alt={news.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-dark-600 font-medium">
              {news.author.name}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-dark-500">
            <div className="flex items-center space-x-1">
              <FaEye />
              <span>{news.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaHeart className={isLikedByMe ? "text-red-500" : "text-dark-400"}/>
              <span>{news?.likes?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;