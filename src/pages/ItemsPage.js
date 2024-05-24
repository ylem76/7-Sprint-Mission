import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// components
import ProductList from '../components/ui/ProductList';
import ProductItem from '../components/ui/ProductItem';
import Pagination from '../components/ui/Pagination';

// hooks
import useResize from '../hooks/useResize';

/**
 * 파라미터가 변경 되면 useCallback과 useEffect로 api조회
 * */
export default function ItemsPage() {
  // [data] 커스텀 훅을 이용해 화면 가로 너비 값 구함
  const { w: windowWidth } = useResize();

  // [data] useState를 활용한 초기값 정의
  const [parameters, setParameters] = useState({
    orderBy: 'recent',
    pageSize: 12,
    page: 1,
  });
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  // [calculate] 렌더링할 아이템 개수 계산
  const calculateItemQuantity = (windowWidth) => {
    if (windowWidth > 1199) return 12;
    if (windowWidth > 767) return 6;
    return 4;
  };

  // [action] setState
  useEffect(() => {
    const itemsPerPage = calculateItemQuantity(windowWidth);
    setParameters((prev) => {
      return {
        ...prev,
        page: 1, // 가로 너비가 달라졌을 때 무조건 1페이지로 이동
        pageSize: itemsPerPage,
      };
    });
  }, [windowWidth]);

  // [action] fetch
  const fetchData = async (params = parameters) => {
    const { orderBy, pageSize, page } = params;
    const url = `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
    const data = await fetch(url);
    const items = await data.json();
    return items;
  };

  const fetchItems = useCallback(fetchData, [parameters]);

  // fetch best items
  useEffect(() => {
    const setBestItemsData = async (parameters) => {
      const items = await fetchData(parameters);
      setBestItems(items.list);
    };

    const bestParams = {
      orderBy: 'favorite',
      pageSize: 4,
      page: 1,
    };
    setBestItemsData(bestParams);
  }, []);

  //fetch items
  useEffect(() => {
    const setItemsData = async () => {
      const items = await fetchItems();
      setItems(items.list);
      setTotalCount(items.totalCount);
    };

    setItemsData();
  }, [fetchItems]);

  // [action]
  const handlePaginationClick = (index) => {
    const currentPage = index;
    setParameters((prev) => {
      return { ...prev, page: currentPage };
    });
  };

  return (
    <div>
      <article>
        <h1>베스트 상품</h1>
      </article>
      <ProductList listType='best'>
        {bestItems &&
          bestItems.map((item) => <ProductItem item={item} key={item.id}></ProductItem>)}
      </ProductList>

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

        <ProductList>
          {items && items.map((item) => <ProductItem item={item} key={item.id}></ProductItem>)}
        </ProductList>
      </article>
      <div>
        {totalCount && (
          <Pagination
            totalPage={Math.ceil(totalCount / parameters.pageSize)}
            currentIndex={parameters.page}
            onClick={handlePaginationClick}
          />
        )}
      </div>
    </div>
  );
}
