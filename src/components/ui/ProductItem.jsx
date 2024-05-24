import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ item }) {
  const { id, name, price, favoriteCount, images } = item;
  return (
    <li key={id}>
      <Link to={`/items/${id}`}>
        <img src={images[0]} alt={item.name} />
        <h3>{name}</h3>
        <p>{price}</p>
        <p>{favoriteCount}</p>
      </Link>
    </li>
  );
}
