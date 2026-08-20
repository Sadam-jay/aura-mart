import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { FiInbox } from 'react-icons/fi';

const ProductGrid = () => {
  const { filteredItems, status, error, searchQuery } = useSelector(
    (state) => state.products 
  );

  // Skeleton Loader Cards
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 animate-pulse"
          >
            <div className="w-full h-48 bg-slate-800 rounded-2xl" />
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-5 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div className="h-6 bg-slate-800 rounded w-1/4" />
              <div className="h-9 bg-slate-800 rounded-full w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State fallback
  if (status === 'failed' && filteredItems.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-3xl my-8">
        <p className="text-rose-400 font-semibold mb-2">Unable to load products from server.</p>
        <p className="text-xs text-slate-400">{error || 'Please check your connection and retry.'}</p>
      </div>
    );
  }

  // Empty Results State
  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl my-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <FiInbox size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">No products found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          {searchQuery
            ? `No matching products for "${searchQuery}". Try searching another keyword.`
            : 'No products available in this category.'}
        </p>
      </div>
    );
  }

  return (
    <div id="products-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
      {filteredItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
