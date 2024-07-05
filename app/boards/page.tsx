'use client';

import React, { useState, useEffect } from 'react';
interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; nickname: string };
}
interface Params {
  page: number;
  pageSize: number;
  orderBy: string;
}
const fetchData = async (params: Params) => {
  const { orderBy, pageSize, page } = params;
  const url = `https://panda-market-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;

  const data = await fetch(url);
  const items = await data.json();
  return items;
};
export default function BoardPage() {
  const [bestArticles, setBestArticles] = useState<Array<Article>>([]);
  const [articles, setArticles] = useState<Array<Article>>([]);

  // fetch best items
  useEffect(() => {
    const setBestArticlesData = async (parameters: Params) => {
      const items = await fetchData(parameters);
      console.log(items);
      setBestArticles(items.list);
    };

    setBestArticlesData({
      orderBy: 'like',
      pageSize: 3,
      page: 1,
    });

    const setArticlesData = async (parameters: Params) => {
      const items = await fetchData(parameters);
      console.log(items);
      setArticles(items.list);
    };

    setArticlesData({ orderBy: 'recent', pageSize: 10, page: 1 });
  }, []);

  return (
    <main>
      <article>
        <h1>베스트 게시글</h1>
        <ul>
          {bestArticles.map(
            ({
              id,
              title,
              content,
              image,
              likeCount,
              createdAt,
              updatedAt,
              writer,
            }: Article) => (
              <li key={id}>
                <p>{title}</p>
                <div>
                  <div>
                    <span>profile image</span>
                    <span>{writer.nickname}</span>
                    <div>{likeCount}</div>
                  </div>
                  <span>{createdAt}</span>
                </div>
              </li>
            )
          )}
        </ul>
      </article>

      <article>
        <h1>게시글</h1>
        <button>글쓰기</button>
        <div>
          <input type='text' placeholder='검색할 상품을 입력해주세요' />
          <select name='' id=''>
            <option value='최신순'></option>
          </select>
        </div>
        <ul>
          {articles.map(
            ({
              id,
              title,
              content,
              image,
              likeCount,
              createdAt,
              updatedAt,
              writer,
            }: Article) => (
              <li key={id}>
                <div>
                  <p>{title}</p>
                  {/* <div>{image && <img src={image} alt={content} />}</div> */}
                  <div>
                    <div>
                      <span>profile image</span>
                      <span>{writer.nickname}</span>
                      <span>{createdAt}</span>
                    </div>
                    <div>{likeCount}</div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </article>
    </main>
  );
}
