'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudentSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profilePhoto: '',
    educationLevel: '',
    subjects: [],
    learningGoals: '',
    learningStyle: '',
    locationAccess: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubjectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, subjects: selected });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Send formData to backend
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
        <h1 className="text-[32px] font-semibold text-center text-indigo-600 mb-6">
          {step === 1 ? 'Create Your Account' : 'Student Profile Setup'}
        </h1>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-5 text-[16px]">
          {step === 1 && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                name="profilePhoto"
                placeholder="Profile Photo URL"
                value={formData.profilePhoto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="educationLevel"
                placeholder="Education Level"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Subjects of Interest
              </label>
              <select
                multiple
                name="subjects"
                onChange={handleSubjectChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
                <option value="Programming">Programming</option>
              </select>

              <textarea
                name="learningGoals"
                placeholder="Your learning goals..."
                value={formData.learningGoals}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />

              <select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Learning Style</option>
                <option value="Visual">Visual</option>
                <option value="Auditory">Auditory</option>
                <option value="Kinesthetic">Kinesthetic</option>
                <option value="Reading/Writing">Reading/Writing</option>
              </select>

              <label className="flex items-center text-sm gap-2">
                <input
                  type="checkbox"
                  name="locationAccess"
                  checked={formData.locationAccess}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Allow location access for better tutor matching
              </label>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-medium text-center hover:bg-indigo-700 transition"
          >
            {step === 1 ? 'Next' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
