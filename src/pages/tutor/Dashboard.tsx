import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  BookOpen,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

const TutorDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      subject: 'Calculus II',
      studentName: 'Emily Johnson',
      studentAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 15, 14, 0),
      duration: 60,
      location: 'Online (Zoom)',
    },
    {
      id: 2,
      subject: 'Linear Algebra',
      studentName: 'Chris Thompson',
      studentAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 17, 10, 30),
      duration: 90,
      location: 'University Library, Room 302',
    },
    {
      id: 3,
      subject: 'Differential Equations',
      studentName: 'Sophia Martinez',
      studentAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: new Date(2025, 6, 18, 15, 45),
      duration: 60,
      location: 'Online (Zoom)',
    },
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastSession: new Date(2025, 6, 10, 14, 0),
      subject: 'Calculus II',
      sessionsCount: 5,
    },
    {
      id: 2,
      name: 'Chris Thompson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastSession: new Date(2025, 6, 12, 10, 30),
      subject: 'Linear Algebra',
      sessionsCount: 3,
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastSession: new Date(2025, 6, 8, 15, 45),
      subject: 'Differential Equations',
      sessionsCount: 1,
    },
    {
      id: 4,
      name: 'Daniel Kim',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastSession: new Date(2025, 6, 5, 13, 0),
      subject: 'Physics 101',
      sessionsCount: 2,
    },
  ];

  const recentReviews = [
    {
      id: 1,
      studentName: 'Emily Johnson',
      studentAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 5,
      comment: 'Excellent tutor! Really helped me understand calculus concepts that I had been struggling with for months.',
      date: new Date(2025, 6, 11),
    },
    {
      id: 2,
      studentName: 'Chris Thompson',
      studentAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4,
      comment: 'Very knowledgeable and patient. Explains complex concepts clearly.',
      date: new Date(2025, 6, 10),
    },
  ];

  // Calculate earnings and stats
  const currentMonthEarnings = 450;
  const previousMonthEarnings = 380;
  const earningsChange = ((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;
  const totalHours = 12;
  const averageRating = 4.8;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your tutoring business.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingSessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-900">${currentMonthEarnings}</p>
                {earningsChange > 0 && (
                  <span className="ml-2 flex items-center text-sm font-medium text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {earningsChange.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Tutored</p>
              <p className="text-2xl font-semibold text-gray-900">{totalHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-900">{averageRating}</p>
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming sessions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Sessions</h2>
            <Link to="/tutor/schedule" className="text-sm text-blue-600 hover:text-blue-500">View all</Link>
          </div>
          <div className="p-6">
            {upcomingSessions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <img 
                        src={session.studentAvatar} 
                        alt={session.studentName} 
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{session.subject}</p>
                        <p className="text-sm text-gray-500">{session.studentName}</p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" /> 
                          {format(session.date, 'MMM d, yyyy')} at {format(session.date, 'h:mm a')}
                        </div>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Clock className="h-4 w-4 mr-1" /> 
                          {session.duration} minutes
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-md text-xs text-blue-700">
                        {session.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No upcoming sessions</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent reviews */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
          </div>
          <div className="p-6">
            {recentReviews.length > 0 ? (
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <img 
                        src={review.studentAvatar} 
                        alt={review.studentName} 
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.studentName}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">
                            {format(review.date, 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No reviews yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent students */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">My Students</h2>
          <Link to="/tutor/students" className="text-sm text-blue-600 hover:text-blue-500">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Session
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sessions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={student.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{format(student.lastSession, 'MMM d, yyyy')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.sessionsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Message</button>
                    <button className="text-blue-600 hover:text-blue-900">Schedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;