const BASE_URL = `https://api.coinpaprika.com/v1`;

// 코인 전체 조회
export async function fetchConis() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// 코인 id별 정보 조회
export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

// 코인 id별 가격 정보 조회
export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// 코인 가격 변동 정보
export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}
