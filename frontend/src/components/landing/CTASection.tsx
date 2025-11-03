import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui';

export const CTASection: React.FC = () => {
  const whatsappNumber = '+2348060374755';
  const whatsappMessage = encodeURIComponent('Hi! I\'m interested in learning more about MegaHub.');

  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-white opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full animate-fade-in-down">
            <Sparkles className="w-4 h-4 animate-pulse-soft" />
            <span className="text-sm font-semibold">Start Your Free Trial</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in-up">
            Ready to Transform Your
            <br className="hidden sm:block" />
            <span className="inline-block mt-2">Hiring Process?</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4">
            Join hundreds of companies using MegaHub to find and categorize top tech talent with AI precision
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12 animate-fade-in px-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-base md:text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-xl group"
              >
                Start Assessing Candidates
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto px-8 py-6 text-base md:text-lg font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:scale-105 transition-all"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* WhatsApp Contact */}
          <div className="flex flex-col items-center gap-4 mb-10 md:mb-12 animate-fade-in px-4">
            <p className="text-blue-100 text-sm md:text-base">Or reach out directly via WhatsApp</p>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 md:pt-10 border-t border-white/20 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-sm md:text-base">
              {[
                { icon: CheckCircle, text: 'No credit card required' },
                { icon: CheckCircle, text: 'Free trial available' },
                { icon: CheckCircle, text: '24/7 support' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center justify-center gap-2 text-blue-100">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
