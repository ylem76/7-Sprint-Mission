import { useState } from 'react';

export default function AddItemPage() {
  return (
    <div>
      <form action='' id='form-add-item'>
        <div className='form-header'>
          <h1>상품 등록하기</h1>
          <button type='submit'>등록</button>
        </div>
        <label htmlFor='ipt-file'>상품 이미지</label>
        <input id='ipt-file' type='file' name='product-image' />

        <label htmlFor='ipt-product-name'>상품명</label>
        <input type='text' id='ipt-product-name' name='product-name' />

        <label htmlFor='ipt-product-description'>상품 소개</label>
        <textarea
          name='product-description'
          id='ipt-product-description'></textarea>

        <label htmlFor='ipt-product-price'>판매 가격</label>
        <input name='product-price' id='ipt-product-price' type='number' />

        <label htmlFor='ipt-tag'>태그</label>
        <input type='text' name='tag' id='ipt-tag' />

        <ul className='tag-list'></ul>
      </form>
    </div>
  );
}
