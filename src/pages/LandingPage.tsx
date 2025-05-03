import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, Star, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Find the perfect</span>
              <span className="block text-blue-200">study group or tutor</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-blue-100">
              Connect with qualified tutors and study groups near you to achieve your academic goals. Personalized learning experiences tailored to your needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-md"
              >
                Join as a Student
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 bg-blue-700"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-0 hidden lg:block w-1/3 h-full">
          <img 
            src="https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Students studying together" 
            className="object-cover w-full h-full opacity-80"
          />
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to excel
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides the tools and connections you need to enhance your learning experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="absolute -top-4 left-6 bg-blue-100 rounded-full p-3">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900">Find Tutors</h3>
                <p className="mt-2 text-base text-gray-500">
                  Search for qualified tutors based on subject, price, rating, and availability. Find the perfect match for your learning needs.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="absolute -top-4 left-6 bg-teal-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900">Join Study Groups</h3>
                <p className="mt-2 text-base text-gray-500">
                  Connect with like-minded students in your area. Join study groups based on subject, location, and meeting frequency.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="absolute -top-4 left-6 bg-amber-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900">Schedule Sessions</h3>
                <p className="mt-2 text-base text-gray-500">
                  Easily book and manage tutoring sessions or study group meetings with our intuitive scheduling system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by students and tutors alike
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
              See what our community has to say about StudyConnect
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-lg text-gray-600 italic">"{testimonial.text}"</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={testimonial.avatar} 
                        alt="" 
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your learning?</span>
            <span className="block text-blue-200">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Get started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    text: 'StudyConnect helped me find an amazing tutor for my algorithms class. My grades improved dramatically after just a few sessions!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Michael Chen',
    role: 'Mathematics Tutor',
    text: 'As a tutor, this platform has connected me with students who genuinely want to learn. The scheduling system makes it easy to manage my sessions.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Jessica Martinez',
    role: 'Biology Student',
    text: 'I joined a study group for my biology class through StudyConnect. Not only did I improve my understanding of the material, but I also made great friends!',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default LandingPage;