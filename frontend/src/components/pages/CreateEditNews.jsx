import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa';
import { useAuthStore, useNewsStore } from "../../store";
import { newsAPI } from "../../services/api";

const CreateEditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { categories } = useNewsStore();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    image: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isEditMode) {
      const fetchNews = async () => {
        try {
          const response = await newsAPI.getNewsById(id);
          if (response.success) {
            const news = response.data;
            // Check if user is the author
            if (news.author._id !== user._id) {
              alert('You can only edit your own news');
              navigate('/profile');
              return;
            }
            setFormData({
              title: news.title,
              excerpt: news.excerpt,
              content: news.content,
              category: news.category,
              image: news.image,
              tags: news.tags.join(', '),
            });
          }
        } catch (error) {
          console.error('Error fetching news:', error);
          navigate('/profile');
        }
      };
      fetchNews();
    }
  }, [id, isEditMode, isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.excerpt || !formData.content || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.content.length < 200) {
      setError('Content must be at least 200 characters');
      return;
    }

    try {
      setLoading(true);
      
      const newsData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        author: user,
      };

      let response;
      if (isEditMode) {
        response = await newsAPI.updateNews(id, newsData);
      } else {
        response = await newsAPI.createNews(newsData);
      }

      if (response.success) {
        alert(isEditMode ? 'News updated successfully!' : 'News created successfully!');
        navigate('/profile');
      } else {
        setError(response.message || 'Failed to save news');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-dark-50 to-white">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 text-dark-600 hover:text-primary-600 transition-colors mb-4"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Profile</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900">
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </h1>
          <p className="text-dark-600 mt-2">
            {isEditMode ? 'Update your article' : 'Share your story with the world'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-dark-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title"
                className="input-field"
                required
              />
            </div>

            {/* Category & Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-dark-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-semibold text-dark-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., AI, Innovation, Future"
                  className="input-field"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-dark-700 mb-2">
                Featured Image URL *
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input-field pl-12"
                  required
                />
              </div>
              {formData.image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-dark-700 mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a short description (2-3 sentences)"
                rows="3"
                className="input-field resize-none"
                required
              />
              <p className="mt-1 text-xs text-dark-500">{formData.excerpt.length} characters</p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-dark-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article content here. Use paragraphs by separating with double line breaks."
                rows="15"
                className="input-field resize-none font-mono text-sm"
                required
              />
              <p className="mt-1 text-xs text-dark-500">
                {formData.content.length} characters (minimum 200)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave />
                <span>{loading ? 'Saving...' : isEditMode ? 'Update Article' : 'Publish Article'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditNews;