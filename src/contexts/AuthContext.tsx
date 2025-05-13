import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor';
  avatar?: string;
  age?: number;
  subjects?: string[];
  educationLevel?: string;
  qualification?: string;
  teachingExperience?: number;
  bio?: string;
  onboardingCompleted?: boolean;
  needsOnboarding?: boolean;
}

interface UserProfile {
  age?: number;
  subjects?: string[];
  subtopics?: string[];
  educationLevel?: string;
  qualification?: string;
  teachingExperience?: number;
  bio?: string;
  onboardingCompleted?: boolean;
  needsOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'student' | 'tutor') => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'tutor') => Promise<void>;
  logout: () => void;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (localStorage in this mock example)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: 'student' | 'tutor') => {
    setLoading(true);
    console.log(password)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '123456',
        name: role === 'student' ? 'Student Name' : 'Tutor Name',
        email,
        role,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        needsOnboarding: false // Existing users don't need onboarding
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: 'student' | 'tutor') => {
    setLoading(true);
    console.log(password)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: '123456',
        name,
        email,
        role,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        needsOnboarding: true // New users need onboarding
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile function
  const updateUserProfile = async (profile: UserProfile) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('No user logged in');
      }

      const updatedUser = {
        ...user,
        ...profile
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw new Error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};