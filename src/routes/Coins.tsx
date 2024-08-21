import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchConis } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;

  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// coin object interface
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  // useQuery안에 query key를 입력 우리 query의 고유식별자
  // 두번째 인자는 fetcher 함수
  // loading과 data를 알려줌
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchConis);

  // coin state
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // // data fetch
  // useEffect(() => {
  //   // 바깥에 따로 함수를 빼지 않고 간단하게 async await를 쓰고 싶으면 이 방식을 통해 함수를 만들어 호출해줄 수 있다.
  //   (async () => {
  //     const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  // console.log(coins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {/* loading state 활용 fetch가 완료될 때까지 loading 중인걸 표시 */}
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {/* coin 정보 리스트 출력 */}
          {/* &rarr; 화살표 넣는거 */}
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* Link를 통해 데이터를 보낼 수 있음 */}
              {/* 이미 우리가 어떤 name을 누르는지 알고 있는데 왜 loading을 또 봐야해? */}
              {/* 데이터는 이미 브라우저가 가지고 있잖아 우리는 이미 필요한 데이터를 받음 */}
              {/* 이번에는 보이지 않는 방식으로(비하인드더씬) 데이터를 어떻게 보내는지 알아봄 */}
              {/* URL 파라미터로 정보를 넘기는것이 아니고 state를 통해 데이터를 넘긴다 */}
              {/* Link를 이용해 데이터를 통째로 옮기는 것도 가능하다 */}
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`}
                  alt={`coin-img`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
