import { useEffect, useState } from 'react';
import Tags from '../components/form/Tags';

const INITIAL_VALUES = {
  images: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
  tags: undefined,
};

function sanitize(type, value) {
  // number type sanitize
  switch (type) {
    case 'number':
      return Number(value) || 0;

    default:
      return value;
  }
}
export default function AddItemPage() {
  const [tags, setTags] = useState(['주름', '테스트']);
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    // when values changed
    setIsAllFilled((prev) => {
      return prev;
    });
  }, [values]);

  // handlers
  const handleSubmit = (e) => {
    // submit handler
    e.preventDefault();
    console.log(e);
  };

  const handleChange = (name, value) => {
    // input change handler
  };

  const handleInputChange = (e) => {
    // input sanitize
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <div>
      <form action='' id='form-add-item' onSubmit={handleSubmit}>
        <div className='form-header'>
          <h1>상품 등록하기</h1>
          <button type='submit'>등록</button>
        </div>
        <label htmlFor='ipt-files'>상품 이미지</label>
        <input id='ipt-files' type='file' name='images' />

        <label htmlFor='ipt-product-name'>상품명</label>
        <input
          type='text'
          id='ipt-product-name'
          name='name'
          value={values.name}
        />

        <label htmlFor='ipt-product-description'>상품 소개</label>
        <textarea name='description' id='ipt-product-description'></textarea>

        <label htmlFor='ipt-product-price'>판매 가격</label>
        <input
          name='price'
          id='ipt-product-price'
          type='number'
          value={values.price}
        />

        <Tags tags={tags} setTags={setTags} />
      </form>
    </div>
  );
}
