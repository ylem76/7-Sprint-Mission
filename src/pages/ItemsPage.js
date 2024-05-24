import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// components
import ProductList from '../components/ui/ProductList';
import ProductItem from '../components/ui/ProductItem';
import Pagination from '../components/ui/Pagination';

// hooks
import useResize from '../hooks/useResize';

export default function ItemsPage() {
  const { w: windowWidth } = useResize();

  const calculateItemQuantity = (windowWidth) => {
    let quantity = 4;
    if (windowWidth > 767) {
      quantity = 6;
    }
    if (windowWidth > 1199) {
      quantity = 12;
    }
    return quantity;
  };
  useEffect(() => {
    const itemPerPage = calculateItemQuantity(windowWidth);
    setParameters((prev) => {
      return {
        ...prev,
        page: 1,
        pageSize: itemPerPage,
      };
    });
  }, [windowWidth]);

  const [parameters, setParameters] = useState({
    orderBy: 'recent',
    pageSize: 12,
    page: 1,
  });

  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const getItems = useCallback(async () => {
    const { orderBy, pageSize, page } = parameters;
    const url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
    const data = await fetch(url);
    const items = await data.json();
    return items;
  }, [parameters]);

  const fetchBestItems = async (parameters) => {
    const { orderBy, pageSize, page } = parameters;
    const url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
    const data = await fetch(url);
    const items = await data.json();
    return items;
  };

  // fetch best items
  useEffect(() => {
    const fetchData = async (parameters) => {
      const items = await fetchBestItems(parameters);
      setBestItems(items.list);
    };

    const bestParams = {
      orderBy: 'favorite',
      pageSize: 4,
      page: 1,
    };
    fetchData(bestParams);
  }, []);

  //fetch items
  useEffect(() => {
    const fetchData = async () => {
      const items = await getItems();
      setItems(items.list);
      setTotalCount(items.totalCount);
    };

    fetchData();
  }, [getItems]);

  const handlePaginationClick = (index) => {
    const currentPage = index + 1;
    setParameters((prev) => {
      return { ...prev, page: currentPage };
    });
  };

  return (
    <div>
      <article>
        <h1>베스트 상품</h1>
      </article>
      <ProductList listType='best'>{bestItems && bestItems.map((item) => <ProductItem item={item} key={item.id}></ProductItem>)}</ProductList>

      <article>
        <h1>전체 상품</h1>
        {/* search & select */}
        <input type='text' placeholder='검색할 상품을 입력해주세요' />
        <Link to='/additem'>상품 등록하기</Link>
        <select
          name='orderBy'
          id='order-by'
          onChange={(e) => {
            setParameters((prevValue) => {
              return { ...prevValue, page: 1, orderBy: e.target.value };
            });
          }}>
          <option value='recent'>최신 순</option>
          <option value='favorite'>좋아요 순</option>
        </select>

        <ProductList>{items && items.map((item) => <ProductItem item={item} key={item.id}></ProductItem>)}</ProductList>
      </article>
      <div>{totalCount && <Pagination totalPage={Math.ceil(totalCount / parameters.pageSize)} currentIndex={parameters.page} onClick={handlePaginationClick} />}</div>
    </div>
  );
}
