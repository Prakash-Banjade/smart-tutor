import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  BookOpen,
  Monitor,
} from 'lucide-react';

// Define tutor type
interface Tutor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  subjects: string[];
  education: string;
  location: string;
  distance: number;
  sessionType: ('online' | 'in-person' | 'both')[];
  availability: string[];
  description: string;
}

const FindTutors: React.FC = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [distance, setDistance] = useState<number>(10);
  const [rating, setRating] = useState<number>(0);
  const [sessionType, setSessionType] = useState<string>('');
  const [availability, setAvailability] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mock data for tutors
  const tutors: Tutor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      reviewCount: 56,
      price: 40,
      subjects: ['Mathematics', 'Calculus', 'Algebra'],
      education: 'Ph.D. in Mathematics, Stanford University',
      location: 'San Francisco, CA',
      distance: 2.5,
      sessionType: ['online', 'in-person'],
      availability: ['Weekdays', 'Evenings'],
      description: 'Experienced math professor with over 10 years of teaching and tutoring experience. Specializes in calculus and advanced math topics.'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      reviewCount: 42,
      price: 45,
      subjects: ['Physics', 'Engineering', 'Mathematics'],
      education: 'Ph.D. in Physics, MIT',
      location: 'San Francisco, CA',
      distance: 3.2,
      sessionType: ['online', 'in-person'],
      availability: ['Weekends', 'Evenings'],
      description: 'Physics professor with expertise in classical mechanics, electromagnetism, and quantum physics. Teaches at both undergraduate and graduate levels.'
    },
    {
      id: '3',
      name: 'Jamie Rodriguez',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      reviewCount: 38,
      price: 35,
      subjects: ['Computer Science', 'Programming', 'Data Structures'],
      education: 'M.S. in Computer Science, UC Berkeley',
      location: 'Oakland, CA',
      distance: 5.8,
      sessionType: ['online'],
      availability: ['Weekdays', 'Weekends', 'Evenings'],
      description: 'Software engineer and CS tutor specializing in algorithms, data structures, and programming languages including Python, Java, and C++.'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      reviewCount: 29,
      price: 30,
      subjects: ['Biology', 'Chemistry', 'Organic Chemistry'],
      education: 'M.D., Harvard Medical School',
      location: 'San Jose, CA',
      distance: 8.7,
      sessionType: ['online', 'in-person'],
      availability: ['Weekends'],
      description: 'Medical student with a strong background in biology and chemistry. Specializes in helping pre-med students prepare for their MCAT exams.'
    },
    {
      id: '5',
      name: 'Dr. Lisa Patel',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 5.0,
      reviewCount: 62,
      price: 50,
      subjects: ['Statistics', 'Data Science', 'R Programming'],
      education: 'Ph.D. in Statistics, UCLA',
      location: 'San Francisco, CA',
      distance: 1.2,
      sessionType: ['online', 'in-person'],
      availability: ['Weekdays', 'Evenings'],
      description: 'Statistician and data scientist with expertise in experimental design, statistical analysis, and machine learning techniques.'
    },
    {
      id: '6',
      name: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.6,
      reviewCount: 34,
      price: 38,
      subjects: ['English Literature', 'Writing', 'Grammar'],
      education: 'M.A. in English Literature, NYU',
      location: 'Berkeley, CA',
      distance: 4.3,
      sessionType: ['online', 'in-person'],
      availability: ['Weekdays', 'Weekends'],
      description: 'Published author and English teacher with a passion for literature and creative writing. Helps students improve their writing skills and literary analysis.'
    },
  ];

  // List of subjects for dropdown
  const subjects = [
    'Mathematics', 
    'Physics', 
    'Chemistry', 
    'Biology', 
    'Computer Science', 
    'English', 
    'History', 
    'Psychology',
    'Statistics',
    'Engineering',
    'Foreign Languages',
    'Economics',
    'Business',
    'Art'
  ];

  // Filter tutors based on search and filters
  const filteredTutors = tutors.filter(tutor => {
    // Search query filter
    if (searchQuery && !tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Subject filter
    if (selectedSubject && !tutor.subjects.includes(selectedSubject)) {
      return false;
    }

    // Price range filter
    if (tutor.price < priceRange[0] || tutor.price > priceRange[1]) {
      return false;
    }

    // Distance filter
    if (tutor.distance > distance) {
      return false;
    }

    // Rating filter
    if (tutor.rating < rating) {
      return false;
    }

    // Session type filter
    if (sessionType) {
      if (sessionType === 'online' && !tutor.sessionType.includes('online')) {
        return false;
      }
      if (sessionType === 'in-person' && !tutor.sessionType.includes('in-person')) {
        return false;
      }
    }

    // Availability filter
    if (availability && !tutor.availability.includes(availability)) {
      return false;
    }

    return true;
  });

  // Sort tutors
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Find a Tutor</h1>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by subject or tutor name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Subject dropdown */}
          <div className="md:w-1/4">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="md:w-1/5">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="distance">Distance</option>
            </select>
          </div>

          {/* Filter button */}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            Filters
          </button>
        </div>

        {/* Advanced filters */}
        {filtersOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price range */}
            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (per hour)
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">$</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span className="mx-2 text-gray-600">to</span>
                <span className="mr-2 text-gray-600">$</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Distance */}
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                Distance (miles)
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{distance} miles</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              >
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            {/* Session Type */}
            <div>
              <label htmlFor="session-type" className="block text-sm font-medium text-gray-700 mb-1">
                Session Type
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
              >
                <option value="">Any Type</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Any Time</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Showing {sortedTutors.length} tutors</p>
      </div>

      {/* Tutors list */}
      <div className="space-y-6">
        {sortedTutors.map((tutor) => (
          <div key={tutor.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <img 
                  src={tutor.avatar} 
                  alt={tutor.name} 
                  className="h-16 w-16 rounded-full object-cover mr-6"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{tutor.name}</h3>
                    <p className="text-lg font-semibold text-gray-900">${tutor.price}/hr</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{tutor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{tutor.reviewCount} reviews</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{tutor.education}</p>
                  <div className="mt-3 flex items-center flex-wrap gap-2">
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{tutor.description}</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 flex-wrap gap-y-2">
                <div className="flex items-center mr-4">
                  <MapPin size={16} className="mr-1 text-gray-400" />
                  {tutor.location} • {tutor.distance} miles away
                </div>
                <div className="flex items-center mr-4">
                  <Monitor size={16} className="mr-1 text-gray-400" />
                  {tutor.sessionType.includes('online') && tutor.sessionType.includes('in-person') 
                    ? 'Online & In-person' 
                    : tutor.sessionType.includes('online') 
                      ? 'Online only' 
                      : 'In-person only'
                  }
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-400" />
                  Available: {tutor.availability.join(', ')}
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-end">
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Book a Session
                </button>
                <button className="mt-2 sm:mt-0 sm:ml-3 w-full sm:w-auto px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedTutors.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tutors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search filters to find available tutors.
            </p>
            <div className="mt-6">
              <button 
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('');
                  setPriceRange([0, 100]);
                  setDistance(10);
                  setRating(0);
                  setSessionType('');
                  setAvailability('');
                  setSortBy('rating');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTutors;