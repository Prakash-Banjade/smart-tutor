import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  BookOpen,
  GraduationCap
} from 'lucide-react';

// Define study group type
interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  location: string;
  distance: number;
  members: number;
  maxMembers: number;
  meetingFrequency: string;
  meetingDays: string[];
  nextMeeting: Date;
  studyLevel: string;
  createdBy: {
    name: string;
    avatar: string;
  };
}

const FindStudyGroups: React.FC = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [groupSize, setGroupSize] = useState<string>('');
  const [meetingFrequency, setMeetingFrequency] = useState<string>('');
  const [studyLevel, setStudyLevel] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('distance');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mock data for study groups
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Calculus Study Group',
      subject: 'Mathematics',
      description: 'We meet weekly to discuss calculus problems and prepare for exams. All levels welcome!',
      location: 'University Library, Room 302',
      distance: 0.5,
      members: 5,
      maxMembers: 8,
      meetingFrequency: 'Weekly',
      meetingDays: ['Tuesday', 'Thursday'],
      nextMeeting: new Date(2025, 6, 16, 16, 0),
      studyLevel: 'Undergraduate',
      createdBy: {
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '2',
      name: 'Biology Research Group',
      subject: 'Biology',
      description: 'Advanced group focusing on genetic research topics. We discuss recent papers and research methodologies.',
      location: 'Science Building, Room 120',
      distance: 1.2,
      members: 6,
      maxMembers: 6,
      meetingFrequency: 'Bi-weekly',
      meetingDays: ['Wednesday'],
      nextMeeting: new Date(2025, 6, 18, 15, 0),
      studyLevel: 'Graduate',
      createdBy: {
        name: 'Alex Thompson',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '3',
      name: 'Programming & Algorithms',
      subject: 'Computer Science',
      description: 'Group focused on algorithm practice and coding challenges. Great for interview preparation!',
      location: 'Online (Zoom)',
      distance: 0,
      members: 8,
      maxMembers: 12,
      meetingFrequency: 'Weekly',
      meetingDays: ['Saturday'],
      nextMeeting: new Date(2025, 6, 20, 10, 0),
      studyLevel: 'All Levels',
      createdBy: {
        name: 'Jamie Rodriguez',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '4',
      name: 'Physics Problem Solving',
      subject: 'Physics',
      description: 'We tackle challenging physics problems together and discuss theoretical concepts.',
      location: 'Coffee Shop Near Campus',
      distance: 0.8,
      members: 4,
      maxMembers: 10,
      meetingFrequency: 'Weekly',
      meetingDays: ['Monday', 'Friday'],
      nextMeeting: new Date(2025, 6, 21, 17, 30),
      studyLevel: 'Undergraduate',
      createdBy: {
        name: 'Lisa Patel',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '5',
      name: 'English Literature Club',
      subject: 'English',
      description: 'We read and discuss classic and modern literature. Current focus is on post-modern American novels.',
      location: 'Community Center, Room 5',
      distance: 2.3,
      members: 7,
      maxMembers: 15,
      meetingFrequency: 'Monthly',
      meetingDays: ['Sunday'],
      nextMeeting: new Date(2025, 6, 22, 14, 0),
      studyLevel: 'All Levels',
      createdBy: {
        name: 'David Wilson',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '6',
      name: 'Data Science Workshop',
      subject: 'Statistics',
      description: 'Hands-on workshop for learning data analysis techniques and tools like Python, R, and SQL.',
      location: 'University Tech Hub',
      distance: 1.1,
      members: 10,
      maxMembers: 15,
      meetingFrequency: 'Weekly',
      meetingDays: ['Wednesday', 'Saturday'],
      nextMeeting: new Date(2025, 6, 23, 13, 0),
      studyLevel: 'Intermediate',
      createdBy: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    }
  ];

  // List of subjects for dropdown
  const subjects = [
    'Mathematics', 
    'Physics', 
    'Chemistry', 
    'Biology', 
    'Computer Science', 
    'English', 
    'History', 
    'Psychology',
    'Statistics',
    'Engineering',
    'Foreign Languages',
    'Economics',
    'Business',
    'Art'
  ];

  // Filter study groups based on search and filters
  const filteredGroups = studyGroups.filter(group => {
    // Search query filter
    if (searchQuery && !group.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !group.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Subject filter
    if (selectedSubject && group.subject !== selectedSubject) {
      return false;
    }

    // Distance filter
    if (group.distance > maxDistance && group.location !== 'Online (Zoom)') {
      return false;
    }

    // Group size filter
    if (groupSize) {
      const size = group.maxMembers;
      if (groupSize === 'small' && size > 5) return false;
      if (groupSize === 'medium' && (size <= 5 || size > 10)) return false;
      if (groupSize === 'large' && size <= 10) return false;
    }

    // Meeting frequency filter
    if (meetingFrequency && group.meetingFrequency !== meetingFrequency) {
      return false;
    }

    // Study level filter
    if (studyLevel && group.studyLevel !== studyLevel) {
      return false;
    }

    return true;
  });

  // Sort study groups
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'size_small':
        return a.members - b.members;
      case 'size_large':
        return b.members - a.members;
      case 'date':
        return a.nextMeeting.getTime() - b.nextMeeting.getTime();
      default:
        return 0;
    }
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Study Groups</h1>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by subject or group name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Subject dropdown */}
          <div className="md:w-1/4">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="md:w-1/5">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="distance">Closest</option>
              <option value="size_small">Group Size (Small to Large)</option>
              <option value="size_large">Group Size (Large to Small)</option>
              <option value="date">Next Meeting Date</option>
            </select>
          </div>

          {/* Filter button */}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            Filters
          </button>
        </div>

        {/* Advanced filters */}
        {filtersOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Distance */}
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Distance (miles)
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{maxDistance} miles</span>
              </div>
            </div>

            {/* Group size */}
            <div>
              <label htmlFor="group-size" className="block text-sm font-medium text-gray-700 mb-1">
                Group Size
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
              >
                <option value="">Any Size</option>
                <option value="small">Small (2-5)</option>
                <option value="medium">Medium (6-10)</option>
                <option value="large">Large (10+)</option>
              </select>
            </div>

            {/* Meeting frequency */}
            <div>
              <label htmlFor="meeting-frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Frequency
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={meetingFrequency}
                onChange={(e) => setMeetingFrequency(e.target.value)}
              >
                <option value="">Any Frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Study level */}
            <div>
              <label htmlFor="study-level" className="block text-sm font-medium text-gray-700 mb-1">
                Study Level
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
              >
                <option value="">Any Level</option>
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Showing {sortedGroups.length} study groups</p>
      </div>

      {/* Study groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 truncate" title={group.name}>
                  {group.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {group.subject}
                </span>
              </div>
              
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1 text-gray-400 flex-shrink-0" />
                <span className="truncate" title={group.location}>
                  {group.location}
                  {group.location !== 'Online (Zoom)' && ` • ${group.distance} miles away`}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Users size={16} className="mr-1 text-gray-400 flex-shrink-0" />
                <span>
                  {group.members}/{group.maxMembers} members
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1 text-gray-400 flex-shrink-0" />
                <span>
                  {group.meetingFrequency} • {group.meetingDays.join(', ')}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1 text-gray-400 flex-shrink-0" />
                <span>
                  Next: {formatDate(group.nextMeeting)}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <GraduationCap size={16} className="mr-1 text-gray-400 flex-shrink-0" />
                <span>{group.studyLevel}</span>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 line-clamp-2" title={group.description}>
                  {group.description}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8 rounded-full" src={group.createdBy.avatar} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500">Created by</p>
                    <p className="text-sm font-medium text-gray-900">{group.createdBy.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedGroups.length === 0 && (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No study groups found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search filters to find available study groups.
            </p>
            <div className="mt-6">
              <button 
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('');
                  setMaxDistance(10);
                  setGroupSize('');
                  setMeetingFrequency('');
                  setStudyLevel('');
                  setSortBy('distance');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindStudyGroups;