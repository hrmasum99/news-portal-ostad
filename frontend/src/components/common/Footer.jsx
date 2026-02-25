import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaNewspaper,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    content: [
      { name: 'All News', path: '/news' },
      { name: 'Technology', path: '/news?category=Technology' },
      { name: 'Business', path: '/news?category=Business' },
      { name: 'Sports', path: '/news?category=Sports' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-dark-900 text-dark-100 pt-16 pb-8 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <FaNewspaper className="text-3xl text-primary-500" />
              <span className="text-2xl font-display font-bold text-white">
                News<span className="text-primary-500">Hub</span>
              </span>
            </Link>
            <p className="text-dark-300 leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and diverse perspectives from around the world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-primary-500 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">Content</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-primary-500 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-dark-300">
                  123 News Street, Media City, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-dark-300 hover:text-primary-500 transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:contact@newshub.com"
                  className="text-dark-300 hover:text-primary-500 transition-colors"
                >
                  contact@newshub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-display font-bold text-2xl mb-3">
              Stay Updated
            </h3>
            <p className="text-dark-300 mb-6">
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-800 border-2 border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-dark-400 text-sm">
              © {currentYear} NewsHub. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-dark-400 hover:text-primary-500 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;