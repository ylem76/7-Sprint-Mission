import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { timeCalculate } from '../utils/timeCalculate';
import useAsync from '../hooks/useAsync';
import { getProducts, getComments } from '../utils/api';

const INITIAL_VALUE = {
  id: null,
  name: '',
  description: '',
  price: null,
  tags: [],
  images: [],
  ownerId: null,
  favoriteCount: null,
  createdAt: '',
  updatedAt: '',
  isFavorite: null,
};

export default function ProductPage() {
  const { productSlug } = useParams();

  const [productDetail, setProductDetail] = useState(INITIAL_VALUE);
  const [comments, setComments] = useState([]);

  const [productPending, productError, onProductAsync] = useAsync(getProducts);
  const [commentPending, commentError, onCommentAsync] = useAsync(getComments);

  const setProductData = async (productSlug) => {
    const product = await onProductAsync(productSlug);
    if (!product) return;
    setProductDetail(product);
  };

  const setCommentsData = async (productSlug) => {
    const comments = await onCommentAsync(productSlug);
    if (!comments) return;
    setComments(comments.list);
  };

  useEffect(() => {
    setProductData(productSlug);
    setCommentsData(productSlug);
  }, [productSlug]);

  useEffect(() => {
    productError && console.log(productError);
    commentError && console.log(commentError);
  }, [productError, commentError]);

  return (
    <main>
      <div></div>
      <div>
        <div>
          <img src={productDetail.images[0]} alt='상품 이미지' />
        </div>
        <div>
          <p>{productDetail.name}</p>
          <p>{productDetail.price}</p>
          <p>상품 소개</p>
          <p>{productDetail.description}</p>

          <p>상품 태그</p>
          <ul className='flex'>
            {productDetail.tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className={`text-base font-normal leading-6 px-4 py-3 flex gap-4 text-left rounded-full bg-gray-100`}>
                  {tag}
                </li>
              );
            })}
          </ul>
          <button>{productDetail.favoriteCount}</button>
        </div>
      </div>

      <p>문의하기</p>
      <textarea
        name=''
        id=''
        placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'></textarea>
      <button>등록</button>

      {/* comments */}
      <ul>
        {comments.map((comment) => {
          const { content, createdAt } = comment;
          const { nickname, image } = comment.writer;
          return (
            <li key={comment.id}>
              <img src={image} alt={`${nickname}님의 프로필 사진`} />
              <p>{content}</p>
              <p>{nickname}</p>
              <p>{timeCalculate(createdAt)}</p>
            </li>
          );
        })}
      </ul>

      <Link to='/items'>목록으로 돌아가기</Link>
    </main>
  );
}
