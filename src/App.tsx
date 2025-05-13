import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/Dashboard';
import TutorDashboard from './pages/tutor/Dashboard';
import FindTutors from './pages/student/FindTutors';
import FindStudyGroups from './pages/student/FindStudyGroups';
import TutorProfile from './pages/tutor/Profile';
import StudentProfile from './pages/student/Profile';
import StudentSchedule from './pages/student/Schedule';
import StudentMessages from './pages/student/Messages';
import TutorSchedule from './pages/tutor/Schedule';
import TutorMessages from './pages/tutor/Messages';
import TutorStudents from './pages/tutor/Students';
import NotFoundPage from './pages/NotFoundPage';
import StudentOnboardingPage from './pages/student/OnboardingPage';
import TutorOnboardingPage from './pages/tutor/OnboardingPage';
import CreateSession from './pages/tutor/CreateSession';
import CreateStudyGroup from './pages/student/CreateStudyGroup';


const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Student protected routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute userRole="student">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="find-tutors" element={<FindTutors />} />
        <Route path="find-study-groups" element={<FindStudyGroups />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="messages" element={<StudentMessages />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="create-study-group" element = {<CreateStudyGroup />} />
        
      </Route>

      {/* Student onboarding route */}
      <Route
        path="/student/onboarding"
        element={
          <ProtectedRoute userRole="student">
            <StudentOnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* Tutor protected routes */}
      <Route
        path="/tutor"
        element={
          <ProtectedRoute userRole="tutor">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TutorDashboard />} />
        <Route path="schedule" element={<TutorSchedule />} />
        <Route path="messages" element={<TutorMessages />} />
        <Route path="students" element={<TutorStudents />} />
        <Route path="profile" element={<TutorProfile />} />
        <Route path="create-session" element={<CreateSession />} />
      </Route>

      {/* Tutor onboarding route */}
      <Route
        path="/tutor/onboarding"
        element={
          <ProtectedRoute userRole="tutor">
            <TutorOnboardingPage />
          </ProtectedRoute>
        }
      />


      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  userRole: 'student' | 'tutor';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== userRole) {
    return <Navigate to={user.role === 'student' ? '/student' : '/tutor'} />;
  }

  // Only redirect to onboarding if the user needs onboarding and isn't already on the onboarding page
  if (user.needsOnboarding && !window.location.pathname.includes('/onboarding')) {
    return <Navigate to={`/${user.role}/onboarding`} />;
  }

  return <>{children}</>;
};

// Import missing components
import { Navigate } from 'react-router-dom';

export default App;