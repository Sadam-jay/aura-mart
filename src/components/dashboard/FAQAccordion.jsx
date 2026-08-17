import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FAQ_LIST } from '../../utils/mockData';

const FAQAccordion = () => {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-12 my-6 max-w-3xl mx-auto">
      <div className="text-center space-y-1 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Support Center
        </span>
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQ_LIST.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`p-1 rounded-full text-gray-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                >
                  <FiChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
