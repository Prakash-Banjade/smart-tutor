import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Menu, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">StudyConnect</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              {user ? (
                <Link 
                  to={user.role === 'student' ? '/student' : '/tutor'} 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {user ? (
                <Link 
                  to={user.role === 'student' ? '/student' : '/tutor'} 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">StudyConnect</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">Connecting students with tutors and study groups.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Careers</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Support</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">FAQ</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} StudyConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;