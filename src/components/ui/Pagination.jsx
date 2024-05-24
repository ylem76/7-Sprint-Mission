import React from 'react';

export default function Pagination({ totalPage, currentIndex, onClick }) {
  const pageArr = Array.from({ length: totalPage }, (_, index) => {
    return { current: index === currentIndex };
  });
  return pageArr.map((page, index) => (
    <div key={index} className={page.current ? 'current' : ''}>
      <button
        onClick={() => {
          onClick(index);
        }}>
        {index + 1}
      </button>
    </div>
  ));
}
