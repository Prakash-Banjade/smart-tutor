import React from 'react';
import { Calendar, Clock, Star, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const TutorStudents: React.FC = () => {
  // Mock data for students
 const students = [
  {
    id: 1,
    name: 'Anjali Shrestha',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subject: 'Calculus II',
    sessionsCompleted: 8,
    lastSession: new Date(2025, 6, 15),
    nextSession: new Date(2025, 6, 22),
    sessionDuration: 14, // in minutes
    rating: 5,
    progress: 85,
  },
  {
    id: 2,
    name: 'Suman Gautam',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subject: 'Physics 101',
    sessionsCompleted: 5,
    lastSession: new Date(2025, 6, 14),
    nextSession: new Date(2025, 6, 21),
    sessionDuration: 12, // in minutes
    rating: 4.5,
    progress: 70,
  },
  {
    id: 3,
    name: 'Ritika Basnet',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subject: 'Linear Algebra',
    sessionsCompleted: 3,
    lastSession: new Date(2025, 6, 13),
    nextSession: new Date(2025, 6, 20),
    sessionDuration: 10, // in minutes
    rating: 5,
    progress: 60,
  },
];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Progress Reports
          </button> */}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id}>
              <div className="px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={student.avatar}
                      alt={student.name}
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{student.name}</h2>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500">{student.subject}</p>
                        <span className="mx-2 text-gray-500">•</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < Math.floor(student.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
                      Message
                    </button>
                    {/* <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Progress
                    </button> */}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      Last session: {format(student.lastSession, 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      Next session: {format(student.nextSession, 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-5 w-5 mr-2 text-gray-400" />
                      {student.sessionsCompleted} sessions completed
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Course Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TutorStudents;