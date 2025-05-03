import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Award,
  Clock,
  DollarSign,
  Edit3,
  Save,
  Star
} from 'lucide-react';

const TutorProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Profile data - in a real app this would come from the database
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Tutor Name',
    email: user?.email || 'tutor@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    education: 'Ph.D. in Mathematics, Stanford University',
    experience: '8 years of teaching and tutoring experience',
    hourlyRate: 40,
    bio: 'Experienced math tutor specializing in calculus, linear algebra, and differential equations. I focus on building strong problem-solving skills and deep conceptual understanding.',
    subjects: ['Mathematics', 'Calculus', 'Linear Algebra', 'Differential Equations'],
    availability: ['Weekdays', 'Evenings'],
    sessionTypes: ['Online', 'In-person'],
    rating: 4.9,
    reviews: 56
  });

  // Form state for editing
  const [formData, setFormData] = useState({ ...profileData });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditing(false);
    // In a real app, this would send the updated profile to the server
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center sm:flex-row sm:space-x-5">
              <div className="relative mb-4 sm:mb-0">
                <img 
                  src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                  alt={profileData.name} 
                  className="h-24 w-24 rounded-full ring-4 ring-white"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                <p className="text-blue-100">{profileData.education}</p>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < Math.floor(profileData.rating) ? 'text-yellow-300 fill-current' : 'text-blue-200'}`} 
                      />
                    ))}
                    <span className="ml-1 text-blue-100">{profileData.rating}</span>
                  </div>
                  <span className="mx-2 text-blue-200">•</span>
                  <span className="text-blue-100">{profileData.reviews} reviews</span>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit3 className="-ml-1 mr-2 h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    id="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...profileData });
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Tutoring Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Award className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{profileData.experience}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="mr-3 h-5 w-5 text-gray-400" />
                      <span>${profileData.hourlyRate}/hour</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Available: {profileData.availability.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Subjects</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.subjects.map((subject, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-2">About Me</h2>
                <p className="text-gray-600">{profileData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;