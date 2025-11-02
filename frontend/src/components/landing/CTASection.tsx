import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../ui';

export const CTASection: React.FC = () => {
  const whatsappNumber = '+2348060374755';
  const whatsappMessage = encodeURIComponent('Hi! I\'m interested in learning more about MegaHub.');

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg sm:text-xl mb-10 text-blue-100">
            Join hundreds of companies using MegaHub to find and categorize top tech talent
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto group"
              >
                Start Assessing Candidates
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg w-full sm:w-auto bg-white/10 hover:bg-white/20 border-2 border-white text-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* WhatsApp Contact */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-blue-100">Or reach out directly via WhatsApp</p>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Free trial available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
