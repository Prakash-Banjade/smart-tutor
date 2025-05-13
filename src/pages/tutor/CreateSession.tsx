import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

const CreateSession: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'tutor') {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        You must be logged in as a tutor to create a session.
      </div>
    );
  }

  const [form, setForm] = useState({
    studentName: '',
    duration: 15,
    location: 'Online (Zoom)',
    customLocation: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionData = {
      ...form,
      tutorId: user.id,
      fullDateTime: new Date(`${form.date}T${form.time}`),
      location: form.location === 'Custom' ? form.customLocation : form.location,
    };
    console.log('Session Created:', sessionData);
    alert('✅ Session created successfully!');
    // TODO: Submit to backend
  };




const sessionRequests = [
  {
    id: 1,
    studentName: 'Aarav Shrestha',
    studentAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    topic: 'Derivatives and Limits',
    subTopics: 'Calculus I',
    tutoringPreference: 'In Person',
    status: 'pending',
    note: 'I am struggling with understanding the chain rule and finding limits using L’Hopital’s Rule. Also, I need clarification on how to apply the fundamental theorem of calculus in some specific cases.'
  },
  {
    id: 2,
    studentName: 'Sita Sharma',
    studentAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    topic: 'Vector Spaces',
    subTopics: 'Linear Algebra',
    tutoringPreference: 'Online',
    status: 'pending',
    note: 'I’m having difficulty understanding the concept of basis and dimension. Can we go through examples of finding a basis for a vector space and how to determine the dimension? Also, some clarification on eigenvectors and eigenvalues would be great.'
  }
];


    const [selectedStudentName, setSelectedStudentName] = useState('');
    const [requests, setRequests] = useState(sessionRequests);

    const handleAccept = (request:any) => {
    // Prefill student in Create Session form
    setSelectedStudentName(request.studentName);

    // Mark the request as accepted
    const updatedRequests = requests.map((r) =>
        r.id === request.id ? { ...r, status: 'created' } : r
    );
    setRequests(updatedRequests);
    };



  return (
    <div>
    <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">📚 Create a New Session</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">👤 Student Name</label>
          <input
            type="text"
            name="studentName"
            value={selectedStudentName}
            onChange={handleChange}
            required
            placeholder="e.g., Aayush Sharma"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">⏱ Duration (mins)</label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            min={5}
            max={90}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">📍 Location</label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Online (Zoom)</option>
            <option>Custom</option>
          </select>
        </div>

        {form.location === 'Custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">🏠 Enter Location Name</label>
            <input
              type="text"
              name="customLocation"
              value={form.customLocation}
              onChange={handleChange}
              required
              placeholder="e.g., Himalayan Java, Kathmandu"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">📅 Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">⏰ Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">📝 Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any specific instructions or context..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          🚀 Create Session
        </button>
      </form>

       


    </div>




    <h2 className="text-xl font-semibold mb-4">Session Requests</h2>

    <div className="space-y-4">
    {sessionRequests.map((request) => (
  <div
    key={request.id}
    className={`p-6 rounded-xl shadow-lg mb-4 transition-all duration-300 ease-in-out ${
      request.status === 'created' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-white hover:shadow-xl'
    }`}
  >
    <div className="flex items-start justify-between">
      {/* Student Avatar and Info */}
      <div className="flex items-center space-x-4">
        <img
          src={request.studentAvatar}
          alt={request.studentName}
          className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{request.studentName}</p>
          <p className="text-sm text-gray-500">
            Topic: <span className="font-medium">{request.topic}</span>
            <br />
            Sub Topics: <span className="font-medium">{request.subTopics}</span>
            <br />
            Tutoring Preference: <span className="font-medium">{request.tutoringPreference}</span>
            <br />
            <span className="text-xs text-gray-400">Mode: Online (Zoom)</span>
          </p>
        </div>
      </div>

      {/* Status Badge */}
      {request.status === 'created' ? (
        <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
          Session Created
        </span>
      ) : (
        <div className="flex space-x-2">
          <button
            className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
            onClick={() => handleAccept(request)}
          >
            Accept
          </button>
          <button
            className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
            // onClick={() => handleReject(request)}
          >
            Reject
          </button>
        </div>
      )}
    </div>

    {/* Note Section */}
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
      <p className="text-sm text-gray-700">
        <span className="font-medium text-gray-800">Note:</span> {request.note}
      </p>
    </div>
  </div>
))}

    </div>

    </div>
  );
};

export default CreateSession;
