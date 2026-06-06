import React from 'react';

const Stars = ({ rating, size = 14, showNumber = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <span key={i} style={{ fontSize: size, color: '#00AA6C' }}>
                ★
              </span>
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <span key={i} style={{ fontSize: size, color: '#00AA6C' }}>
                ⭐
              </span>
            );
          }
          return (
            <span key={i} style={{ fontSize: size, color: '#D1D5DB' }}>
              ★
            </span>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-gray-900">{rating}</span>
      )}
    </div>
  );
};

export default Stars;