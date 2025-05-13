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
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData({ ...formData, subjects: selected });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle API submission here
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-foreground bg-background min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {step === 1 ? 'Create Your Account' : 'Student Profile Setup'}
      </h1>

      <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="url"
              name="profilePhoto"
              placeholder="Profile Photo URL"
              value={formData.profilePhoto}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
            />
            <label className="block text-sm font-medium">Subjects of Interest</label>
            <select
              multiple
              name="subjects"
              onChange={handleSubjectChange}
              className="w-full px-4 py-2 border rounded h-32"
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
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="learningStyle"
              value={formData.learningStyle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Learning Style</option>
              <option value="Visual">Visual</option>
              <option value="Auditory">Auditory</option>
              <option value="Kinesthetic">Kinesthetic</option>
              <option value="Reading/Writing">Reading/Writing</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="locationAccess"
                checked={formData.locationAccess}
                onChange={handleChange}
              />
              Allow location access for better tutor matching
            </label>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
  );
}
