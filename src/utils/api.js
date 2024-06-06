const BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProducts(productSlug) {
  const response = await fetch(`${BASE_URL}/products/${productSlug}`);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  return body;
}

export async function getComments(productSlug, limit = 5) {
  const response = await fetch(
    `${BASE_URL}/products/${productSlug}/comments?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  console.log(body);
  return body;
}
