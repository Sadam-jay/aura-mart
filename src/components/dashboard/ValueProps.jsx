import React from 'react';
import { FiTruck, FiRefreshCw, FiHeadphones, FiShield } from 'react-icons/fi';

const ValueProps = () => {
  const props = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      desc: 'Free shipping on all orders over ₹500 with real-time tracking.',
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      desc: 'Hassle-free return policy for a full refund.',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Customer Support',
      desc: 'Friendly customer service available via live chat and email.',
    },
    {
      icon: FiShield,
      title: '100% Authentic',
      desc: 'All products are guaranteed 100% original and verified.',
    },
  ];

  return (
    <section id="value-props" className="py-12 my-6 border-t border-b border-gray-200">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Our Guarantees
        </h2>
        <h3 className="text-2xl font-bold text-gray-900">
          Why Shop With Us
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs transition-all hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Icon size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ValueProps;
