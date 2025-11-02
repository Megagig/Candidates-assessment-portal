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
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what our clients say about transforming their hiring process
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />

              {/* Quote */}
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
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
