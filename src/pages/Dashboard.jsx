import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import HeroBanner from '../components/dashboard/HeroBanner';
import CategoryFilter from '../components/dashboard/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import ValueProps from '../components/dashboard/ValueProps';
import FAQAccordion from '../components/dashboard/FAQAccordion';
import QuickViewModal from '../components/products/QuickViewModal';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Slider Banner */}
      <HeroBanner />

      {/* Category Filter & Sort Options */}
      <CategoryFilter />

      {/* Dynamic Product Grid */}
      <ProductGrid />

      {/* Company Value Propositions ("Add what we sell") */}
      <ValueProps />

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* Quick View Modal */}
      <QuickViewModal />
    </div>
  );
};

export default Dashboard;
