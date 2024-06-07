import apiHandler from './ApiHandler';

export async function getProducts(productSlug) {
  return await apiHandler.get(`/products/${productSlug}`);
}

export async function getComments(productSlug, limit = 5) {
  return await apiHandler.get(
    `/products/${productSlug}/comments?limit=${limit}`
  );
}
