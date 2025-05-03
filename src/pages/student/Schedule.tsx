import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const StudentSchedule: React.FC = () => {
  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      subject: 'Calculus II',
      tutorName: 'Dr. Sarah Johnson',
      tutorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 15, 14, 0),
      duration: 60,
      location: 'Online (Zoom)',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Physics 101',
      tutorName: 'Prof. Michael Chen',
      tutorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 17, 10, 30),
      duration: 90,
      location: 'University Library, Room 302',
      status: 'upcoming'
    }
  ];

  const pastSessions = [
    {
      id: 3,
      subject: 'Linear Algebra',
      tutorName: 'Dr. Emily Rodriguez',
      tutorAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 10, 15, 0),
      duration: 60,
      location: 'Online (Zoom)',
      status: 'completed'
    },
    {
      id: 4,
      subject: 'Chemistry',
      tutorName: 'Dr. Alex Thompson',
      tutorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 8, 11, 0),
      duration: 90,
      location: 'Science Building, Room 205',
      status: 'completed'
    }
  ];

  const renderSession = (session: any) => (
    <div key={session.id} className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex items-start">
        <img 
          src={session.tutorAvatar} 
          alt={session.tutorName} 
          className="h-12 w-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{session.subject}</h3>
              <p className="text-sm text-gray-600">with {session.tutorName}</p>
            </div>
            <div className="flex items-center">
              {session.status === 'upcoming' ? (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Upcoming
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {format(session.date, 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              {format(session.date, 'h:mm a')} ({session.duration} min)
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {session.location}
            </div>
          </div>

          {session.status === 'upcoming' && (
            <div className="mt-4 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Join Session
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Reschedule
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Schedule</h1>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Sessions</h2>
        {upcomingSessions.map(renderSession)}
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Past Sessions</h2>
        {pastSessions.map(renderSession)}
      </div>
    </div>
  );
};

export default StudentSchedule;