const BASE_URL = 'https://panda-market-api.vercel.app';
class ApiHandler {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async request() {}
  async get(url) {
    const response = await fetch(this.baseUrl + url);
    if (!response.ok) {
      throw new Error(`${response.status} 데이터를 불러오는데 실패했습니다`);
    }
    const result = await response.json();
    return result;
  }
  post(url, body) {}
}

const apiHandler = new ApiHandler(BASE_URL);

export default apiHandler;
