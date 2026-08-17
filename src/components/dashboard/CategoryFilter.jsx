import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory, setSortBy } from '../../redux/slices/productsSlice';
import { FiGrid, FiTv, FiWatch, FiUserCheck, FiUsers, FiSliders } from 'react-icons/fi';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { selectedCategory, sortBy, filteredItems, items } = useSelector(
    (state) => state.products
  );

  const categories = [
    { id: 'all', label: 'All Products', icon: FiGrid },
    { id: 'electronics', label: 'Electronics', icon: FiTv },
    { id: 'jewelery', label: 'Jewelry', icon: FiWatch },
    { id: "men's clothing", label: "Men's Apparel", icon: FiUserCheck },
    { id: "women's clothing", label: "Women's Apparel", icon: FiUsers },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 border-b border-gray-200">
      
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => dispatch(setSelectedCategory(cat.id))}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-white' : 'text-blue-600'} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Item Count & Sort */}
      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
        <span className="text-xs font-medium text-gray-500">
          Showing <strong className="text-gray-900">{filteredItems.length}</strong> of {items.length} products
        </span>

        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 shadow-xs">
          <FiSliders className="text-gray-400" size={13} />
          <span className="font-medium text-gray-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="default" className="bg-white text-gray-800">Featured</option>
            <option value="price-low" className="bg-white text-gray-800">Price: Low to High</option>
            <option value="price-high" className="bg-white text-gray-800">Price: High to Low</option>
            <option value="rating" className="bg-white text-gray-800">Top Rated</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default CategoryFilter;
