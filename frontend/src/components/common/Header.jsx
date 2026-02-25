import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaNewspaper } from 'react-icons/fa';
import { useAuthStore, useUIStore } from '../../store';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <FaNewspaper className="text-3xl text-primary-600 relative z-10 transform group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-display font-bold text-dark-900 tracking-tight">
              News<span className="text-primary-600">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-dark-100 transition-colors duration-300"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-500"
                  />
                  <span className="font-medium text-dark-800">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 animate-scale-in border border-dark-100">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-dark-50 transition-colors"
                    >
                      <FaUserCircle className="text-dark-600" />
                      <span className="text-dark-800 font-medium">My Profile</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-dark-50 transition-colors"
                    >
                      <FaNewspaper className="text-dark-600" />
                      <span className="text-dark-800 font-medium">My News</span>
                    </Link>
                    <hr className="my-2 border-dark-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt className="text-red-600" />
                      <span className="text-red-600 font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl text-dark-800 hover:text-primary-600 transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="text-dark-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-dark-50 transition-all"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-dark-200" />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 py-2 px-4 hover:bg-dark-50 rounded-lg transition-colors"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary-500"
                    />
                    <span className="font-medium text-dark-800">{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-3 py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                  >
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn-secondary text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;