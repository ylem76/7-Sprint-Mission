import React from 'react';
import style from './Pagination.module.css';

function PaginationItem({ page, index, onClick }) {
  return (
    <div key={index} className={page.current ? 'current' : ''}>
      <button
        onClick={() => {
          onClick(index + 1);
        }}>
        {index + 1}
      </button>
    </div>
  );
}
export default function Pagination(props) {
  const { totalPage, currentIndex, onClick } = props;
  const pageArr = Array.from({ length: totalPage }, (_, index) => ({ current: index === currentIndex }));
  return (
    <div className={style.pagination}>
      <button
        disabled={currentIndex <= 1}
        onClick={() => {
          console.log(currentIndex);
          onClick(currentIndex - 1);
        }}>
        이전
      </button>
      {pageArr.map((page, index) => (
        <PaginationItem key={index} index={index} page={page} onClick={onClick} />
      ))}
      <button
        disabled={currentIndex >= pageArr.length}
        onClick={() => {
          onClick(currentIndex + 1);
        }}>
        다음
      </button>
    </div>
  );
}
