
// Mock data that can be easily replaced with real API calls

// Mock users
const mockUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Tech journalist and writer',
    createdAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Business reporter',
    createdAt: new Date('2024-02-20'),
  },
];

// Mock news data
const mockNewsData = [
  {
    _id: 'news-1',
    title: 'Revolutionary AI Technology Transforms Healthcare Industry',
    slug: 'revolutionary-ai-technology-transforms-healthcare',
    content: `In a groundbreaking development, artificial intelligence is revolutionizing the healthcare sector. Medical professionals are now leveraging advanced AI algorithms to diagnose diseases with unprecedented accuracy. This technological leap promises to make healthcare more accessible and efficient for millions of people worldwide.

The integration of machine learning models has enabled doctors to detect patterns in medical imaging that were previously invisible to the human eye. Early detection rates for critical conditions have improved by over 40% in pilot programs across major hospitals.

Healthcare providers are also using AI-powered chatbots to provide 24/7 patient support, reducing wait times and improving overall patient satisfaction. The technology is particularly beneficial in rural areas where access to specialist doctors is limited.

Industry experts predict that AI will become an integral part of standard medical practice within the next five years, fundamentally changing how we approach healthcare delivery.`,
    excerpt: 'Artificial intelligence is revolutionizing healthcare with advanced diagnostic capabilities and improved patient care.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    author: mockUsers[0],
    views: 1245,
    likes: 89,
    comments: [],
    tags: ['AI', 'Healthcare', 'Technology', 'Innovation'],
    featured: true,
    published: true,
    createdAt: new Date('2026-02-24T10:30:00'),
    updatedAt: new Date('2026-02-24T10:30:00'),
  },
  {
    _id: 'news-2',
    title: 'Global Markets Rally as Economic Indicators Show Strong Growth',
    slug: 'global-markets-rally-economic-indicators',
    content: `Stock markets around the world surged today as new economic data revealed robust growth across major economies. The Dow Jones Industrial Average climbed 2.3%, while the S&P 500 reached a new all-time high.

Economists attribute the rally to positive employment figures, rising consumer confidence, and strong corporate earnings reports. Manufacturing output has increased by 5% quarter-over-quarter, signaling a healthy expansion in industrial production.

The Federal Reserve indicated that the current economic trajectory supports a stable interest rate environment, providing further confidence to investors. Technology and renewable energy sectors led the gains, with several companies announcing major expansion plans.

International trade volumes have also shown significant improvement, suggesting a strengthening global economy. Analysts remain cautiously optimistic about sustained growth throughout the year.`,
    excerpt: 'Stock markets surge globally as economic data reveals strong growth and positive indicators across sectors.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop',
    author: mockUsers[1],
    views: 2103,
    likes: 156,
    comments: [],
    tags: ['Economy', 'Markets', 'Business', 'Finance'],
    featured: true,
    published: true,
    createdAt: new Date('2026-02-24T09:15:00'),
    updatedAt: new Date('2026-02-24T09:15:00'),
  },
  {
    _id: 'news-3',
    title: 'Championship Team Secures Historic Victory in Overtime Thriller',
    slug: 'championship-team-historic-victory',
    content: `In an electrifying match that will be remembered for years to come, the championship team secured a dramatic overtime victory last night. The final score of 101-98 came after a nail-biting fourth quarter that saw multiple lead changes.

Star player Marcus Johnson delivered a career-defining performance, scoring 35 points including the game-winning shot with just 2 seconds remaining on the clock. His clutch performance earned him Player of the Game honors.

The victory marks the team's third consecutive playoff win and puts them in prime position for a championship run. Head coach Sarah Martinez praised the team's resilience and mental toughness throughout the intense matchup.

Fans packed the stadium to capacity, creating an atmosphere that players described as "electric" and "unforgettable." The team will face their next opponent in three days.`,
    excerpt: 'An overtime thriller sees championship team secure dramatic victory with last-second heroics.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
    author: mockUsers[0],
    views: 3421,
    likes: 298,
    comments: [],
    tags: ['Basketball', 'Sports', 'Championship', 'Playoffs'],
    featured: true,
    published: true,
    createdAt: new Date('2026-02-23T22:45:00'),
    updatedAt: new Date('2026-02-23T22:45:00'),
  },
  {
    _id: 'news-4',
    title: 'Breakthrough Study Reveals New Treatment for Chronic Diseases',
    slug: 'breakthrough-study-chronic-diseases-treatment',
    content: `Medical researchers have announced a significant breakthrough in treating chronic diseases. A comprehensive five-year study involving 10,000 participants has demonstrated the effectiveness of a new treatment protocol.

The research, published in a leading medical journal, shows that the innovative approach reduces symptoms by up to 60% in patients with chronic conditions. The treatment combines traditional therapies with cutting-edge biotechnology.

Principal investigator Dr. Emily Chen stated that the findings could transform how chronic diseases are managed, potentially improving quality of life for millions of patients worldwide. Clinical trials are expanding to include a broader patient demographic.

Pharmaceutical companies are already working on making the treatment more accessible and affordable. Health insurance providers are reviewing coverage options to include the new protocol.`,
    excerpt: 'Revolutionary five-year study unveils new treatment protocol showing 60% symptom reduction in chronic disease patients.',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=500&fit=crop',
    author: mockUsers[1],
    views: 1876,
    likes: 187,
    comments: [],
    tags: ['Health', 'Medical Research', 'Treatment', 'Science'],
    featured: false,
    published: true,
    createdAt: new Date('2026-02-23T14:20:00'),
    updatedAt: new Date('2026-02-23T14:20:00'),
  },
  {
    _id: 'news-5',
    title: 'Space Agency Announces Ambitious Mission to Mars Colony',
    slug: 'space-agency-mars-colony-mission',
    content: `The International Space Agency unveiled plans for an ambitious mission to establish the first permanent human colony on Mars. The project, dubbed "New Horizon," aims to send the first crew of settlers to the Red Planet by 2035.

The mission will utilize cutting-edge spacecraft technology and sustainable life support systems designed to operate in Mars' harsh environment. Initial plans call for a colony of 100 pioneers who will work to establish infrastructure for future expansion.

Scientists have been developing advanced agriculture techniques that will allow colonists to grow food in Martian soil. Water extraction from underground ice deposits will provide essential resources for the settlement.

The announcement has sparked global excitement about humanity's future as a multi-planetary species. Private aerospace companies have already committed billions in funding to support the historic endeavor.`,
    excerpt: 'Historic space mission announced to establish first permanent human colony on Mars by 2035.',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=500&fit=crop',
    author: mockUsers[0],
    views: 4532,
    likes: 423,
    comments: [],
    tags: ['Space', 'Mars', 'Science', 'Exploration'],
    featured: false,
    published: true,
    createdAt: new Date('2026-02-23T11:00:00'),
    updatedAt: new Date('2026-02-23T11:00:00'),
  },
  {
    _id: 'news-6',
    title: 'Entertainment Industry Embraces Virtual Reality Concerts',
    slug: 'entertainment-virtual-reality-concerts',
    content: `The entertainment industry is undergoing a massive transformation as virtual reality concerts become mainstream. Major artists are now performing in immersive VR environments that allow fans worldwide to experience shows as if they were present.

Recent VR concerts have attracted millions of attendees, with ticket prices significantly lower than traditional venue shows. The technology enables fans to choose their viewing angle, interact with other attendees, and even meet artists in virtual meet-and-greet sessions.

Record labels report that VR concerts are generating substantial revenue while reducing the environmental impact of touring. Artists appreciate the ability to reach global audiences without the physical demands of extensive travel.

Technology companies are investing heavily in developing more sophisticated VR platforms with improved graphics, spatial audio, and haptic feedback. Industry analysts predict that VR will become the primary concert format within the next decade.`,
    excerpt: 'Virtual reality transforms entertainment industry as major artists embrace immersive concert experiences for global audiences.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop',
    author: mockUsers[1],
    views: 2987,
    likes: 267,
    comments: [],
    tags: ['Entertainment', 'VR', 'Music', 'Technology'],
    featured: true,
    published: true,
    createdAt: new Date('2026-02-22T16:30:00'),
    updatedAt: new Date('2026-02-22T16:30:00'),
  },
  {
    _id: 'news-7',
    title: 'Renewable Energy Surpasses Fossil Fuels in Power Generation',
    slug: 'renewable-energy-surpasses-fossil-fuels',
    content: `For the first time in history, renewable energy sources have surpassed fossil fuels in global power generation. This milestone marks a significant turning point in the fight against climate change.

Solar and wind energy led the surge, with solar panel efficiency improvements and larger wind farm installations contributing to record-breaking production levels. Countries worldwide reported that renewables now account for 52% of their energy mix.

The transition has created millions of new jobs in the green energy sector while reducing carbon emissions by 30% compared to last year. Investment in renewable infrastructure has reached unprecedented levels as governments and private sectors commit to sustainability goals.

Energy experts celebrate this achievement as proof that clean energy transition is not only possible but economically viable. The trend is expected to accelerate as technology continues to improve and costs decrease.`,
    excerpt: 'Historic milestone achieved as renewable energy sources surpass fossil fuels in global power generation.',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
    author: mockUsers[0],
    views: 3156,
    likes: 342,
    comments: [],
    tags: ['Environment', 'Renewable Energy', 'Climate', 'Sustainability'],
    featured: false,
    published: true,
    createdAt: new Date('2026-02-22T13:45:00'),
    updatedAt: new Date('2026-02-22T13:45:00'),
  },
  {
    _id: 'news-8',
    title: 'Tech Giants Launch Initiative for Digital Privacy Protection',
    slug: 'tech-giants-digital-privacy-initiative',
    content: `Leading technology companies have joined forces to launch a comprehensive initiative focused on protecting digital privacy. The coalition includes major players from social media, e-commerce, and cloud computing sectors.

The initiative introduces new standards for data encryption, user consent, and transparent data usage policies. Companies will implement end-to-end encryption for all communications and give users greater control over their personal information.

Privacy advocates have praised the move as a significant step forward in protecting consumer rights in the digital age. The new standards will be implemented across all platforms within the next six months.

Independent auditors will regularly verify compliance, and companies face substantial penalties for violations. The initiative also includes educational programs to help users understand and manage their digital privacy.`,
    excerpt: 'Major tech companies unite to launch comprehensive digital privacy protection initiative with new encryption standards.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    author: mockUsers[1],
    views: 2445,
    likes: 201,
    comments: [],
    tags: ['Technology', 'Privacy', 'Security', 'Digital Rights'],
    featured: false,
    published: true,
    createdAt: new Date('2026-02-21T10:15:00'),
    updatedAt: new Date('2026-02-21T10:15:00'),
  },
];

// API simulation functions - These will be replaced with real API calls

const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, 500));

export const newsAPI = {
  // Get all news
  getAllNews: async () => {
    await simulateNetworkDelay();
    return { success: true, data: mockNewsData };
  },

  // Get top/featured news
  getTopNews: async (limit = 6) => {
    await simulateNetworkDelay();
    const topNews = mockNewsData.filter(news => news.featured).slice(0, limit);
    return { success: true, data: topNews };
  },

  // Get single news by ID
  getNewsById: async (id) => {
    await simulateNetworkDelay();
    const news = mockNewsData.find(item => item._id === id);
    if (news) {
      return { success: true, data: news };
    }
    return { success: false, message: 'News not found' };
  },

  // Get news by category
  getNewsByCategory: async (category) => {
    await simulateNetworkDelay();
    if (category === 'All') {
      return { success: true, data: mockNewsData };
    }
    const filteredNews = mockNewsData.filter(news => news.category === category);
    return { success: true, data: filteredNews };
  },

  // Create news (user must be authenticated)
  createNews: async (newsData) => {
    await simulateNetworkDelay();
    const newNews = {
      _id: `news-${Date.now()}`,
      ...newsData,
      views: 0,
      likes: 0,
      comments: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // In real app, this would send to backend
    return { success: true, data: newNews };
  },

  // Update news
  updateNews: async (id, newsData) => {
    await simulateNetworkDelay();
    // In real app, this would update in backend
    return { success: true, data: { _id: id, ...newsData, updatedAt: new Date() } };
  },

  // Delete news
  deleteNews: async (id) => {
    await simulateNetworkDelay();
    // In real app, this would delete from backend
    return { success: true, message: 'News deleted successfully' };
  },

  // Get user's news
  getUserNews: async (userId) => {
    await simulateNetworkDelay();
    const userNews = mockNewsData.filter(news => news.author._id === userId);
    return { success: true, data: userNews };
  },
};

export const authAPI = {
  // Login
  login: async (email, password) => {
    await simulateNetworkDelay();
    // Mock validation
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
      return {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  // Register
  register: async (userData) => {
    await simulateNetworkDelay();
    const newUser = {
      _id: `user-${Date.now()}`,
      ...userData,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      createdAt: new Date(),
    };
    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now(),
      },
    };
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    await simulateNetworkDelay();
    return {
      success: true,
      data: { _id: userId, ...userData },
    };
  },

  // Get user profile
  getProfile: async (userId) => {
    await simulateNetworkDelay();
    const user = mockUsers.find(u => u._id === userId);
    if (user) {
      return { success: true, data: user };
    }
    return { success: false, message: 'User not found' };
  },
};

export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    await simulateNetworkDelay();
    // In real app, this would send to backend
    return { success: true, message: 'Message sent successfully' };
  },
};

// Helper function to format date
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Helper function to get reading time
export const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};