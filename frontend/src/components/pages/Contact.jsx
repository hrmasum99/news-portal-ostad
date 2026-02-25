import { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from 'react-icons/fa';
import { contactAPI } from "../../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await contactAPI.submitContact(formData);

      if (response.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      content: '123 News Street, Media City, NY 10001',
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      content: '+1 (123) 456-7890',
      link: 'tel:+11234567890',
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: 'contact@newshub.com',
      link: 'mailto:contact@newshub.com',
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook', color: 'bg-blue-600' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'bg-sky-500' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram', color: 'bg-pink-600' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn', color: 'bg-blue-700' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-dark-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-display font-bold text-dark-900 mb-6">
                Send us a Message
              </h2>

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 animate-slide-down">
                  <p className="text-green-700 font-medium">
                    ✓ Your message has been sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 animate-slide-down">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-dark-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    className="input-field resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 animate-slide-up animation-delay-200">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <info.icon className="text-2xl text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-900 mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-dark-600 hover:text-primary-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-dark-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-4">Follow Us</h3>
              <p className="mb-6 text-primary-100">
                Stay connected with us on social media for the latest updates and news.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 ${social.color} hover:opacity-90 rounded-full flex items-center justify-center transition-all hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">Office Hours</h3>
              <div className="space-y-3 text-dark-700">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-dark-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 animate-fade-in">
          <div className="bg-dark-100 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-6xl text-dark-400 mx-auto mb-4" />
              <p className="text-dark-600 font-medium">Map integration can be added here</p>
              <p className="text-dark-500 text-sm">Google Maps, Mapbox, or similar service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;