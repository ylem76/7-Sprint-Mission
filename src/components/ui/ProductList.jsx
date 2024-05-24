import React from 'react';
import style from './ProductList.module.css';
export default function ProductList({ listType, children }) {
  return <ul className={`${style[listType]} ${style['product-list']}`}>{children}</ul>;
}
