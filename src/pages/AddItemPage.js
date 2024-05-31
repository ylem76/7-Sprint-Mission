import { useEffect, useState } from 'react';
import Tags from '../components/form/Tags';
import FileInput from '../components/form/FileInput';

const INITIAL_VALUES = {
  images: undefined,
  name: '',
  description: '',
  price: '',
  tags: ['tag test'],
};

function sanitize(type, value) {
  // number type sanitize

  switch (type) {
    case 'number':
      console.log(typeof value);
      return Number(value) || 0;

    default:
      return value;
  }
}
export default function AddItemPage() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    console.log(values.price);
    // when values changed
    // setIsFormComplete((prev) => {
    //   return prev;
    // });
  }, [values]);

  useEffect(() => {
    console.log(isFormComplete);
  }, [isFormComplete]);

  // handlers
  const handleSubmit = (e) => {
    // submit handler
    e.preventDefault();
    console.log(e);
  };

  const handleChange = (name, value) => {
    // input change handler
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    // input sanitize
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <div>
      <form
        method='post'
        // action='/submit'
        id='form-add-item'
        onSubmit={handleSubmit}>
        <div className='form-header'>
          <h1>상품 등록하기</h1>
          <button
            type='submit'
            disabled={!isFormComplete}
            onClick={() => {
              console.log(isFormComplete);
            }}>
            등록
          </button>
        </div>
        <label htmlFor='ipt-files'>상품 이미지</label>

        <FileInput setValues={setValues} />

        <label htmlFor='ipt-product-name'>상품명</label>
        <input
          type='text'
          id='ipt-product-name'
          name='name'
          value={values.name}
          onChange={handleInputChange}
        />

        <label htmlFor='ipt-product-description'>상품 소개</label>
        <textarea
          name='description'
          id='ipt-product-description'
          onChange={handleInputChange}></textarea>

        <label htmlFor='ipt-product-price'>판매 가격</label>
        <input
          name='price'
          id='ipt-product-price'
          type='number'
          value={values.price.toString()}
          onChange={handleInputChange}
        />

        <Tags tags={values.tags} setTags={handleChange} setValues={setValues} />
      </form>
    </div>
  );
}
