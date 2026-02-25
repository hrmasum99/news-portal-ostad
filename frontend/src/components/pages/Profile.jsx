import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaPlus,
  FaTrash,
  FaEye,
  FaHeart,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { useAuthStore, useNewsStore } from '../../store'; 
import { authAPI, newsAPI, formatDate } from '../../services/api'; 
import Loading from '../common/Loading'; 

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUser, logout } = useAuthStore();
  const [userNews, setUserNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      logout();
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const newsRes = await newsAPI.getUserNews(user._id);
        if (newsRes.success) {
          setUserNews(newsRes.data);
        }

        setFormData({
          name: user.name,
          email: user.email,
          bio: user.bio || '',
          avatar: user.avatar || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, navigate, logout]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.updateProfile(user._id, formData);
      if (response.success) {
        updateUser(response.data);
        setEditMode(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await newsAPI.deleteNews(newsId);
        setUserNews(userNews.filter((news) => news._id !== newsId));
        alert('News deleted successfully!');
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Failed to delete news');
      }
    }
  };

  if (loading || !user) return <Loading fullScreen />;

  const totalViews = userNews.reduce((sum, news) => sum + news.views, 0);
  const totalLikes = userNews.reduce((sum, news) => sum + (news?.likes?.length || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-dark-50 to-white">
      <div className="container-custom max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={editMode && formData.avatar ? formData.avatar : user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-primary-500 object-cover"
              />
              <button onClick={() => setEditMode(true)} className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer">
                <FaEdit />
              </button>
            </div>

            <div className="flex-1">
              {!editMode ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-display font-bold text-dark-900">
                      {user.name}
                    </h1>
                    <button
                      onClick={() => setEditMode(true)}
                      className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
                      title="Edit Profile"
                    >
                      <FaEdit className="text-primary-600" />
                    </button>
                  </div>
                  <p className="text-dark-600 mb-2">{user.email}</p>
                  <p className="text-dark-700">{user.bio || 'No bio yet'}</p>
                </>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-1">Profile Image URL</label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://example.com/my-image.jpg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Your bio"
                      rows="3"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <FaSave />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          bio: user.bio || '',
                          avatar: user.avatar || '',
                        });
                      }}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 bg-dark-50 rounded-xl p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{userNews.length}</p>
                <p className="text-sm text-dark-600">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-dark-600">Views</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{totalLikes}</p>
                <p className="text-sm text-dark-600">Likes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-dark-900">My Articles</h2>
          <Link to="/profile/create-news" className="btn-primary flex items-center space-x-2">
            <FaPlus />
            <span>Create New Article</span>
          </Link>
        </div>

        {userNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userNews.map((news) => (
              <div key={news._id} className="card group">

                <div className="relative overflow-hidden h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge bg-primary-600 text-white">{news.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link
                      to={`/profile/edit-news/${news._id}`}
                      className="p-2 bg-white hover:bg-primary-50 rounded-lg shadow-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="text-primary-600" />
                    </Link>
                    <button
                      onClick={() => handleDeleteNews(news._id)}
                      className="p-2 bg-white hover:bg-red-50 rounded-lg shadow-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <Link
                    to={`/news/${news._id}`}
                    className="text-xl font-display font-bold text-dark-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors block"
                  >
                    {news.title}
                  </Link>

                  <p className="text-dark-600 mb-4 line-clamp-2">{news.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-dark-100 text-sm text-dark-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <FaEye />
                        <span>{news.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaHeart />
                        <span>{news.likes}</span>
                      </div>
                    </div>
                    <span>{formatDate(news.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">
              No articles yet
            </h3>
            <p className="text-dark-600 mb-6">Start sharing your stories with the world!</p>
            <Link to="/profile/create-news" className="btn-primary inline-flex items-center space-x-2">
              <FaPlus />
              <span>Create Your First Article</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;