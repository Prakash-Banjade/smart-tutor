import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const upcomingSessions = [
  {
    id: 1,
    subject: 'Calculus II',
    tutorName: 'Dr. Arjun Bhatt',
    tutorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(2025, 6, 15, 14, 0),
    duration: 10, // Duration less than 15 minutes
    location: 'Online (Zoom)', // Zoom for online session
  },
  {
    id: 2,
    subject: 'Physics 101',
    tutorName: 'Prof. Michael Chen',
    tutorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(2025, 6, 17, 10, 30),
    duration: 10, // Duration less than 15 minutes
    location: 'Tribhuvan University, Science Bhawan, Room 302', // Nepali location in English letters
  },
];

const studyGroups = [
  {
    id: 1,
    name: 'Calculus Study Group',
    subject: 'Mathematics',
    members: 5,
    maxMembers: 8,
    nextMeeting: new Date(2025, 6, 16, 16, 0),
    location: 'Public Pustakalaya', // Nepali location in English letters
  },
  {
    id: 2,
    name: 'Biology Research Group',
    subject: 'Biology',
    members: 6,
    maxMembers: 6,
    nextMeeting: new Date(2025, 6, 18, 15, 0),
    location: 'Vigyan Bhawan, Room 120', // Nepali location in English letters
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'session-completed',
    subject: 'Algebra',
    tutorName: 'Jamie Rodriguez',
    date: new Date(2025, 6, 10, 13, 0),
  },
  {
    id: 2,
    type: 'group-joined',
    groupName: 'Physics Study Group',
    date: new Date(2025, 6, 12, 9, 30),
  },
  {
    id: 3,
    type: 'session-booked',
    subject: 'Calculus II',
    tutorName: 'Dr. Arjun Bhatt',
    date: new Date(2025, 6, 13, 16, 45),
  },
];


  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your study schedule.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
            <p className="text-2xl font-semibold text-gray-900">{upcomingSessions.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-teal-100 mr-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Study Groups</p>
            <p className="text-2xl font-semibold text-gray-900">{studyGroups.length}</p>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Study Hours (This Month)</p>
            <p className="text-2xl font-semibold text-gray-900">12.5</p>
          </div>
        </div> */}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/student/find-tutors" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white flex items-center justify-between group">
          <div>
            <h3 className="text-lg font-semibold">Find a Tutor</h3>
            <p className="text-blue-100 mt-1">Search for qualified tutors based on your needs</p>
          </div>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link to="/student/find-study-groups" className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow p-6 text-white flex items-center justify-between group">
          <div>
            <h3 className="text-lg font-semibold">Join a Study Group</h3>
            <p className="text-teal-100 mt-1">Connect with other students in your area</p>
          </div>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link to="/student/create-study-group" className="bg-gradient-to-r bg-gray-500 rounded-lg shadow p-6 text-white flex items-center justify-between group">
          <div>
            <h3 className="text-lg font-semibold">Create a Study Group</h3>
            <p className="text-teal-100 mt-1">Create a study group in a specific topic.</p>
          </div>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming sessions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Sessions</h2>
            <Link to="/student/schedule" className="text-sm text-blue-600 hover:text-blue-500">View all</Link>
          </div>
          <div className="p-6">
            {upcomingSessions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <img 
                        src={session.tutorAvatar} 
                        alt={session.tutorName} 
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{session.subject}</p>
                        <p className="text-sm text-gray-500">{session.tutorName}</p>
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
                <Link to="/student/find-tutors" className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-500">
                  Find a tutor
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Study groups */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">My Study Groups</h2>
            <Link to="/student/find-study-groups" className="text-sm text-blue-600 hover:text-blue-500">Find groups</Link>
          </div>
          <div className="p-6">
            {studyGroups.length > 0 ? (
              <div className="space-y-4">
                {studyGroups.map((group) => (
                  <div key={group.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                        <p className="text-xs text-gray-500">{group.subject}</p>
                      </div>
                      <div className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-800 font-medium flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {group.members}/{group.maxMembers}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" /> 
                      Next meeting: {format(group.nextMeeting, 'MMM d, yyyy')} at {format(group.nextMeeting, 'h:mm a')}
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" /> 
                      {group.location}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">You haven't joined any study groups yet</p>
                <Link to="/student/find-study-groups" className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-500">
                  Browse study groups
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-4 flex">
                  <div className="mr-4">
                    {activity.type === 'session-completed' && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'group-joined' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                    )}
                    {activity.type === 'session-booked' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.type === 'session-completed' && (
                        <>Completed a tutoring session for <span className="font-medium">{activity.subject}</span> with {activity.tutorName}</>
                      )}
                      {activity.type === 'group-joined' && (
                        <>Joined <span className="font-medium">{activity.groupName}</span></>
                      )}
                      {activity.type === 'session-booked' && (
                        <>Booked a tutoring session for <span className="font-medium">{activity.subject}</span> with {activity.tutorName}</>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(activity.date, 'MMM d, yyyy')} at {format(activity.date, 'h:mm a')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;