import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Search,
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isStudent = user?.role === 'student';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on user role
  const navigationItems = isStudent
    ? [
      { name: 'Dashboard', icon: <BookOpen size={20} />, href: '/student' },
      { name: 'Find Tutors', icon: <Search size={20} />, href: '/student/find-tutors' },
      { name: 'Find Study Groups', icon: <Users size={20} />, href: '/student/find-study-groups' },
      { name: 'Create Study Group', icon: <MessageSquare size={20} />, href: '/student/create-study-group' },
      { name: 'My Schedule', icon: <Calendar size={20} />, href: '/student/schedule' },
      { name: 'Messages', icon: <MessageSquare size={20} />, href: '/student/messages' },
      
    ]
    : [
      { name: 'Dashboard', icon: <BookOpen size={20} />, href: '/tutor' },
      { name: 'My Students', icon: <Users size={20} />, href: '/tutor/students' },
      { name: 'Schedule', icon: <Calendar size={20} />, href: '/tutor/schedule' },
      { name: 'Create Session', icon: <Calendar size={20} />, href: '/tutor/create-session' },
      { name: 'Messages', icon: <MessageSquare size={20} />, href: '/tutor/messages' },
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudyConnect</span>
            </Link>
            <button
              className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={`mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudyConnect</span>
            </Link>
          </div>
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-3 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center">
              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileMenuOpen(false);
                  }}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* Notifications dropdown */}
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        <span className="font-medium">Notifications</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {[1, 2, 3].map((i) => (
                          <a
                            key={i}
                            href="#"
                            className="block px-4 py-3 hover:bg-gray-50 transition"
                            onClick={(e) => {
                              e.preventDefault();
                              setNotificationsOpen(false);
                            }}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.pexels.com/photos/22${i}0784/pexels-photo-22${i}0784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {isStudent ? `Tutor ${i}` : `Student ${i}`}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {isStudent
                                    ? `Confirmed your upcoming Math session`
                                    : `Requested a tutoring session`}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="border-t border-gray-200">
                        <a
                          href="#"
                          className="block text-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                          onClick={(e) => {
                            e.preventDefault();
                            setNotificationsOpen(false);
                          }}
                        >
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative ml-4">
                <button
                  className="flex items-center space-x-2 text-sm focus:outline-none"
                  onClick={() => {
                    setProfileMenuOpen(!profileMenuOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    alt=""
                  />
                  <span className="hidden md:block font-medium text-gray-700">
                    {user?.name || 'User Name'}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {/* Profile dropdown panel */}
                {profileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to={`/${user?.role}/profile`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to={`/${user?.role}/settings`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;