import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: 'MegaHub reduced our screening time by 70%!',
      author: 'Sarah Johnson',
      role: 'Tech Lead',
      company: 'TechCorp Inc.',
      avatar: 'SJ',
    },
    {
      quote: 'The tier system helps us match candidates to projects perfectly',
      author: 'Michael Chen',
      role: 'HR Manager',
      company: 'StartupXYZ',
      avatar: 'MC',
    },
    {
      quote: 'Finally, a tool that understands developer skill progression',
      author: 'Emily Rodriguez',
      role: 'CTO',
      company: 'DevSolutions',
      avatar: 'ER',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            See what our clients say about transforming their hiring process
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 md:w-14 md:h-14 text-blue-600 dark:text-blue-400 mb-6" />

              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
