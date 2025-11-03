import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How accurate is the tier assessment?',
      answer:
        'Our tier assessment is highly accurate, using a comprehensive questionnaire that evaluates specific technical skills and capabilities. The algorithm has been refined with input from industry experts and validated against hundreds of real developer profiles.',
    },
    {
      question: 'What technologies does the assessment cover?',
      answer:
        'The assessment covers HTML, CSS, JavaScript, React, Next.js, database technologies, authentication systems, backend frameworks like Express and Hono, and advanced technologies like Golang. We continuously update our questions to reflect current industry standards.',
    },
    {
      question: 'Can we customize the assessment questions?',
      answer:
        'Yes! Enterprise clients can work with our team to customize assessment questions to match their specific technology stack and requirements. Contact us to discuss custom assessment solutions.',
    },
    {
      question: 'Is candidate data secure?',
      answer:
        'Absolutely. We use industry-standard encryption, secure authentication with JWT tokens, and follow GDPR compliance guidelines. All candidate data is stored securely and only accessible to authorized administrators.',
    },
    {
      question: 'How do I get started as an admin?',
      answer:
        'Simply register for an admin account on our platform. Your registration will be reviewed by our super admin team for approval. Once approved, you\'ll receive an email and can log in to access the full dashboard and candidate management features.',
    },
    {
      question: 'How long does the assessment take?',
      answer:
        'The typical assessment takes 10-15 minutes to complete. We\'ve designed it to be comprehensive yet efficient, respecting both the candidate\'s time and the need for thorough skill evaluation.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 md:w-7 md:h-7 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 md:px-8 py-6 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
