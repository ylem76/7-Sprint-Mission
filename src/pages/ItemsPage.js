import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function ItemsPage() {
  const [parameters, setParameters] = useState({
    orderBy: 'recent',
    pageSize: 10,
    page: 1,
  });

  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    const { orderBy, pageSize, page } = parameters;
    const url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
    const data = await fetch(url);
    const items = await data.json();
    return items;
  }, [parameters]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getItems();
      setItems(items.list);
    };

    fetchData();
  }, [getItems]);

  return (
    <div>
      <article>
        <h1>베스트 상품</h1>
      </article>
      <ul></ul>

      <article>
        <h1>전체 상품</h1>
        {/* search & select */}
        <input type='text' placeholder='검색할 상품을 입력해주세요' />
        <Link to='/'>상품 등록하기</Link>
        <select name='orderBy' id='order-by'>
          <option value='recent'>최신 순</option>
          <option value='favorite'>좋아요 순</option>
        </select>

        {/* list */}
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <p>{item.favoriteCount}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
