// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight, Upload, Mail, Lock, User, BookOpen, Calendar, MapPin, Clock } from 'lucide-react';

// export default function AuthPage() {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [userType, setUserType] = useState('');
//   const [formData, setFormData] = useState({
//     // Account Creation
//     email: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//     profilePhoto: null,
    
//     // Student Profile
//     educationLevel: '',
//     subjects: [],
//     learningGoals: '',
//     learningStyle: '',
    
//     // Tutor Profile
//     credentials: '',
//     experience: '',
//     expertise: [],
//     teachingStyle: '',
//     hourlyRate: '',
//     availability: [],
//     documents: [],
    
//     // Preferences
//     communicationPreference: '',
//     groupSize: '',
//     maxDistance: '',
//     meetingPreference: '',
//     notifications: {
//       email: true,
//       push: true,
//       sms: false,
//     }
//   });

//   const totalSteps = userType === 'student' ? 4 : 5;

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (type === 'checkbox') {
//       setFormData({
//         ...formData,
//         notifications: {
//           ...formData.notifications,
//           [name]: checked
//         }
//       });
//     } else if (name === 'profilePhoto' || name === 'documents') {
//       setFormData({
//         ...formData,
//         [name]: e.target.files
//       });
//     } else if (name === 'subjects' || name === 'expertise') {
//       // Handle multi-select
//       const selectedValue = e.target.value;
//       const currentValues = [...formData[name]];
      
//       if (currentValues.includes(selectedValue)) {
//         setFormData({
//           ...formData,
//           [name]: currentValues.filter(item => item !== selectedValue)
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: [...currentValues, selectedValue]
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleUserTypeSelect = (type) => {
//     setUserType(type);
//     setCurrentStep(2);
//   };

//   const handleNext = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Submit form and redirect
//       console.log("Form submitted:", formData);
//       router.push(userType === 'student' ? '/dashboard/student' : '/dashboard/tutor');
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // Subject options for multi-select
//   const subjectOptions = [
//     'Mathematics', 'Physics', 'Chemistry', 'Biology', 
//     'Computer Science', 'Literature', 'History', 'Geography',
//     'Economics', 'Business', 'Psychology', 'Philosophy',
//     'Foreign Languages', 'Art & Design', 'Music'
//   ];

//   // Available learning/teaching styles
//   const learningStyles = [
//     'Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic',
//     'Group-based', 'Individual', 'Project-based', 'Discussion-based'
//   ];

//   // Education levels
//   const educationLevels = [
//     'High School', 'Undergraduate', 'Graduate', 'Postgraduate',
//     'Professional'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-4 px-6">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <div className="text-2xl font-bold text-indigo-600">Smart Study Group</div>
//           <div className="text-sm">
//             Already have an account? <a href="/login" className="text-indigo-600 font-medium">Log in</a>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
//           {/* Progress Bar */}
//           <div className="bg-gray-100 p-4">
//             <div className="w-full h-2 bg-gray-200 rounded-full">
//               <div 
//                 className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
//                 style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between mt-2 text-xs text-gray-500">
//               <div className={currentStep >= 1 ? "text-indigo-600 font-medium" : ""}>
//                 User Type
//               </div>
//               <div className={currentStep >= 2 ? "text-indigo-600 font-medium" : ""}>
//                 Account
//               </div>
//               <div className={currentStep >= 3 ? "text-indigo-600 font-medium" : ""}>
//                 {userType === 'student' ? 'Student Profile' : 'Tutor Profile'}
//               </div>
//               {userType === 'tutor' && (
//                 <div className={currentStep >= 4 ? "text-indigo-600 font-medium" : ""}>
//                   Verification
//                 </div>
//               )}
//               <div className={currentStep >= totalSteps ? "text-indigo-600 font-medium" : ""}>
//                 Preferences
//               </div>
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="p-6">
//             {/* Step 1: User Type Selection */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Join Smart Study Group</h2>
//                   <p className="text-gray-600">Choose how you want to use our platform</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <button
//                     onClick={() => handleUserTypeSelect('student')}
//                     className={`p-6 border-2 rounded-lg flex flex-col items-center text-center transition-all hover:bg-indigo-50
//                     ${userType === 'student' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
//                   >
//                     <div className="bg-indigo-100 p-4 rounded-full mb-4">
//                       <BookOpen className="h-8 w-8 text-indigo-600" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">Join as a Student</h3>
//                     <p className="text-gray-600 text-sm">Find tutors and study groups that match your learning needs</p>
//                   </button>

//                   <button
//                     onClick={() => handleUserTypeSelect('tutor')}
//                     className={`p-6 border-2 rounded-lg flex flex-col items-center text-center transition-all hover:indigo-50
//                     ${userType === 'tutor' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
//                   >
//                     <div className="bg-emerald-100 p-4 rounded-full mb-4">
//                       <User className="h-8 w-8 text-emerald-600" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">Join as a Tutor</h3>
//                     <p className="text-gray-600 text-sm">Share your knowledge and connect with students</p>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Account Creation */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Your Account</h2>
//                   <p className="text-gray-600">Let's set up your basic information</p>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         placeholder="your@email.com"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         placeholder="Create a secure password"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         placeholder="Enter password again"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <User className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         placeholder="Your full name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (Optional)</label>
//                     <div className="mt-1 flex items-center">
//                       <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                         {formData.profilePhoto ? (
//                           <img src={URL.createObjectURL(formData.profilePhoto[0])} alt="Profile Preview" className="h-full w-full object-cover" />
//                         ) : (
//                           <User className="h-6 w-6 text-gray-400" />
//                         )}
//                       </div>
//                       <label 
//                         htmlFor="profilePhoto" 
//                         className="ml-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
//                       >
//                         <Upload className="h-4 w-4 mr-2" />
//                         <span>Upload</span>
//                         <input
//                           id="profilePhoto"
//                           name="profilePhoto"
//                           type="file"
//                           accept="image/*"
//                           onChange={handleInputChange}
//                           className="sr-only"
//                         />
//                       </label>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <div className="flex items-center">
//                       <input
//                         id="terms"
//                         name="terms"
//                         type="checkbox"
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                         required
//                       />
//                       <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                         I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Student Profile Creation */}
//             {currentStep === 3 && userType === 'student' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Student Profile</h2>
//                   <p className="text-gray-600">Tell us about your learning needs</p>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
//                     <select
//                       id="educationLevel"
//                       name="educationLevel"
//                       value={formData.educationLevel}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       required
//                     >
//                       <option value="">Select your education level</option>
//                       {educationLevels.map((level) => (
//                         <option key={level} value={level}>{level}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects of Interest</label>
//                     <div className="mt-1 grid grid-cols-2 gap-2">
//                       {subjectOptions.map((subject) => (
//                         <div key={subject} className="flex items-center">
//                           <input
//                             id={`subject-${subject}`}
//                             name="subjects"
//                             value={subject}
//                             type="checkbox"
//                             checked={formData.subjects.includes(subject)}
//                             onChange={handleInputChange}
//                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor={`subject-${subject}`} className="ml-2 block text-sm text-gray-700">
//                             {subject}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="learningGoals" className="block text-sm font-medium text-gray-700 mb-1">Learning Goals</label>
//                     <textarea
//                       id="learningGoals"
//                       name="learningGoals"
//                       value={formData.learningGoals}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       placeholder="Describe what you want to achieve..."
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700 mb-1">Preferred Learning Style</label>
//                     <select
//                       id="learningStyle"
//                       name="learningStyle"
//                       value={formData.learningStyle}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     >
//                       <option value="">Select your preferred learning style</option>
//                       {learningStyles.map((style) => (
//                         <option key={style} value={style}>{style}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Tutor Profile Creation */}
//             {currentStep === 3 && userType === 'tutor' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Tutor Profile</h2>
//                   <p className="text-gray-600">Tell us about your teaching experience</p>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="credentials" className="block text-sm font-medium text-gray-700 mb-1">Academic Credentials</label>
//                     <input
//                       type="text"
//                       id="credentials"
//                       name="credentials"
//                       value={formData.credentials}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       placeholder="e.g., BSc in Computer Science, Stanford University"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Teaching Experience</label>
//                     <textarea
//                       id="experience"
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       placeholder="Describe your teaching experience..."
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Subjects of Expertise</label>
//                     <div className="mt-1 grid grid-cols-2 gap-2">
//                       {subjectOptions.map((subject) => (
//                         <div key={subject} className="flex items-center">
//                           <input
//                             id={`expertise-${subject}`}
//                             name="expertise"
//                             value={subject}
//                             type="checkbox"
//                             checked={formData.expertise.includes(subject)}
//                             onChange={handleInputChange}
//                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor={`expertise-${subject}`} className="ml-2 block text-sm text-gray-700">
//                             {subject}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="teachingStyle" className="block text-sm font-medium text-gray-700 mb-1">Teaching Style</label>
//                     <select
//                       id="teachingStyle"
//                       name="teachingStyle"
//                       value={formData.teachingStyle}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     >
//                       <option value="">Select your teaching style</option>
//                       {learningStyles.map((style) => (
//                         <option key={style} value={style}>{style}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
//                     <input
//                       type="number"
//                       id="hourlyRate"
//                       name="hourlyRate"
//                       value={formData.hourlyRate}
//                       onChange={handleInputChange}
//                       min="5"
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       placeholder="e.g., 25"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
//                     <div className="grid grid-cols-7 gap-2 text-center text-xs">
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                         <div key={day} className="font-medium">{day}</div>
//                       ))}
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                         <div key={`${day}-morning`} className="bg-gray-100 p-2 rounded cursor-pointer">Morning</div>
//                       ))}
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                         <div key={`${day}-afternoon`} className="bg-gray-100 p-2 rounded cursor-pointer">Afternoon</div>
//                       ))}
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                         <div key={`${day}-evening`} className="bg-gray-100 p-2 rounded cursor-pointer">Evening</div>
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">Click to select your available time slots</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Tutor Verification */}
//             {currentStep === 4 && userType === 'tutor' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verification Documents</h2>
//                   <p className="text-gray-600">Upload documents to verify your credentials</p>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">Upload Documents</label>
//                     <p className="text-xs text-gray-500 mb-2">
//                       Please upload any of the following: ID, degree certificates, teaching credentials
//                     </p>
//                     <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                       <div className="space-y-1 text-center">
//                         <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                         <div className="flex text-sm text-gray-600">
//                           <label
//                             htmlFor="documents"
//                             className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                           >
//                             <span>Upload files</span>
//                             <input
//                               id="documents"
//                               name="documents"
//                               type="file"
//                               multiple
//                               onChange={handleInputChange}
//                               className="sr-only"
//                             />
//                           </label>
//                           <p className="pl-1">or drag and drop</p>
//                         </div>
//                         <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB each</p>
//                       </div>
//                     </div>
//                     {formData.documents && formData.documents.length > 0 && (
//                       <div className="mt-2">
//                         <p className="text-sm font-medium text-gray-700">Selected files:</p>
//                         <ul className="text-sm text-gray-600 list-disc list-inside">
//                           {Array.from(formData.documents).map((file, index) => (
//                             <li key={index}>{file.name}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
//                     <p className="text-sm text-amber-800">
//                       <strong>Note:</strong> Your documents will be reviewed by our team before your tutor profile is approved. This process usually takes 1-2 business days.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4/5: Preferences & Settings */}
//             {((userType === 'student' && currentStep === 4) || (userType === 'tutor' && currentStep === 5)) && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Preferences</h2>
//                   <p className="text-gray-600">Customize your experience</p>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="communicationPreference" className="block text-sm font-medium text-gray-700 mb-1">
//                       Preferred Communication Method
//                     </label>
//                     <select
//                       id="communicationPreference"
//                       name="communicationPreference"
//                       value={formData.communicationPreference}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     >
//                       <option value="">Select communication preference</option>
//                       <option value="chat">In-app Chat</option>
//                       <option value="email">Email</option>
//                       <option value="video">Video Call</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
//                       {userType === 'student' ? 'Preferred Study Group Size' : 'Preferred Teaching Group Size'}
//                     </label>
//                     <select
//                       id="groupSize"
//                       name="groupSize"
//                       value={formData.groupSize}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     >
//                       <option value="">Select group size preference</option>
//                       <option value="1">1-on-1 Only</option>
//                       <option value="small">Small Groups (2-4)</option>
//                       <option value="medium">Medium Groups (5-10)</option>
//                       <option value="large">Large Groups (10+)</option>
//                       <option value="any">No Preference</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="maxDistance" className="block text-sm font-medium text-gray-700 mb-1">
//                       Maximum Distance Willing to Travel (miles)
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <MapPin className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="number"
//                         id="maxDistance"
//                         name="maxDistance"
//                         value={formData.maxDistance}
//                         onChange={handleInputChange}
//                         min="0"
//                         max="100"
//                         className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                         placeholder="0 = Online only"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="meetingPreference" className="block text-sm font-medium text-gray-700 mb-1">
//                       Meeting Preference
//                     </label>
//                     <select
//                       id="meetingPreference"
//                       name="meetingPreference"
//                       value={formData.meetingPreference}
//                       onChange={handleInputChange}
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     >
//                       <option value="">Select meeting