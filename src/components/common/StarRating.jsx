import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating = 0, count = 0, showCount = true, size = 12 }) => {
  const stars = [];
  const rate = Number(rating) || 0;

  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      stars.push(<FaStar key={i} className="text-amber-400" style={{ fontSize: `${size}px` }} />);
    } else if (rate >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-400" style={{ fontSize: `${size}px` }} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" style={{ fontSize: `${size}px` }} />);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="text-[11px] font-bold text-amber-500 font-mono">
        {rate.toFixed(1)}
      </span>
      {showCount && count > 0 && (
        <span className="text-[10px] text-gray-400 font-normal">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
