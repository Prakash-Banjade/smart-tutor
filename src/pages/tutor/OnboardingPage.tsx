import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Psychology',
  'Other'
];

const qualifications = [
  'High School Diploma',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Teaching Certification',
  'Other'
];

const TutorOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();
  const [age, setAge] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [qualification, setQualification] = useState('');
  const [teachingExperience, setTeachingExperience] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!age || selectedSubjects.length === 0 || !qualification || !teachingExperience) {
      return setError('Please fill in all required fields');
    }

    setIsLoading(true);

    try {
      await updateUserProfile({
        age: parseInt(age),
        subjects: selectedSubjects,
        qualification,
        teachingExperience: parseInt(teachingExperience),
        bio,
        onboardingCompleted: true,
        needsOnboarding: false
      });
      navigate('/tutor');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h2 className="text-center text-2xl font-bold text-white">Complete Your Tutor Profile</h2>
          <p className="text-center text-blue-100 mt-1">Help us understand your expertise and experience</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="18"
                max="100"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects You Can Teach (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className={`border rounded-md py-2 px-3 text-sm cursor-pointer ${
                      selectedSubjects.includes(subject)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSubjectToggle(subject)}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                Highest Qualification
              </label>
              <select
                id="qualification"
                name="qualification"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select your qualification</option>
                {qualifications.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="teachingExperience" className="block text-sm font-medium text-gray-700">
                Years of Teaching Experience
              </label>
              <input
                id="teachingExperience"
                name="teachingExperience"
                type="number"
                min="0"
                max="50"
                required
                value={teachingExperience}
                onChange={(e) => setTeachingExperience(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Tell us about your teaching experience and approach..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Complete Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorOnboardingPage; 