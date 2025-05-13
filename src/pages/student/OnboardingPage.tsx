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

const subtopicsMap: Record<string, string[]> = {
  'Computer Science': [
    'Frontend',
    'Backend',
    'Python',
    'Java',
    'Machine Learning',
    'Graphics',
    'Microprocessor',
    'Cybersecurity',
    'Databases',
    'Cloud Computing'
  ]
};

const educationLevels = [
  'High School',
  'Undergraduate',
  'Graduate',
  'Other'
];

const StudentOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();

  const [age, setAge] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [subtopicSearch, setSubtopicSearch] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    if (subject === 'Computer Science' && selectedSubjects.includes(subject)) {
      setSelectedSubtopics([]); // clear subtopics if deselected
    }
  };

  const handleSubtopicToggle = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((s) => s !== subtopic)
        : [...prev, subtopic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!age || selectedSubjects.length === 0 || !educationLevel) {
      return setError('Please fill in all required fields');
    }

    setIsLoading(true);
    try {
      await updateUserProfile({
        age: parseInt(age),
        subjects: selectedSubjects,
        subtopics: selectedSubtopics,
        educationLevel,
        onboardingCompleted: true,
        needsOnboarding: false
      });
      navigate('/student');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubtopics = subtopicsMap['Computer Science']?.filter((sub) =>
    sub.toLowerCase().includes(subtopicSearch.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-indigo-600">
          <h2 className="text-center text-2xl font-bold text-white">Complete Your Profile</h2>
          <p className="text-center text-indigo-100 mt-1">Help us personalize your learning experience</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                id="age"
                type="number"
                required
                min={5}
                max={100}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects of Interest (Select multiple)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`cursor-pointer px-3 py-2 rounded border text-sm ${
                      selectedSubjects.includes(subject)
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Subtopics if CS is selected */}
            {selectedSubjects.includes('Computer Science') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Computer Science Subtopics
                </label>
                <input
                  type="text"
                  placeholder="Search subtopics..."
                  className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={subtopicSearch}
                  onChange={(e) => setSubtopicSearch(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  {filteredSubtopics.map((subtopic) => (
                    <div
                      key={subtopic}
                      onClick={() => handleSubtopicToggle(subtopic)}
                      className={`cursor-pointer px-3 py-2 rounded border text-sm ${
                        selectedSubtopics.includes(subtopic)
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {subtopic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Level */}
            <div>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                Education Level
              </label>
              <select
                id="educationLevel"
                required
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select...</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 text-white rounded-md font-medium text-sm shadow-sm ${
                  isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboardingPage;
