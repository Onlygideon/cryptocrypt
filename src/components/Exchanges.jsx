import { Collapse, Row, Col, Typography, Avatar} from 'antd';
import HTMLReactParser from "html-react-parser";
import millify from 'millify';

import { useGetExchangesQuery } from "../services/cryptoStatsApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse



const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery({count: 50});
    const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col style={{fontSize: '1rem', marginBottom: '0.5rem'}} span={24}><strong>Exchange Platforms</strong></Col>
      </Row>
      <Row>
            {exchangesList.map((exchange) => (
                <Col span={24}>
                    <Collapse>
                    <Panel
                        key={exchange.id}
                        showArrow={true}
                        header={(
                        <Row key={exchange.id}>
                            <Col span={24}>
                            <Text className="exchange"><strong>{exchange.rank}.</strong></Text>
                            <Avatar src={exchange.iconUrl} />
                            <Text style={{marginLeft: '20px'}}><strong>{exchange.name}</strong></Text>
                            </Col>
                        </Row>
                        )}
                        >
                        {HTMLReactParser(exchange.description || '')}
                        <Col span={24} style={{fontWeight: '700', marginBottom: '0.5rem'}}>{`24h Trade Volume:- $${millify(exchange.volume)}`}</Col>
                        <Col span={24} style={{fontWeight: '700', marginBottom: '0.5rem'}}>{`Markets:- ${millify(exchange.numberOfMarkets)}`}</Col>
                        <Col span={24} style={{fontWeight: '700', marginBottom: '0.5rem'}}>{`Change:- ${millify(exchange.marketShare)}`}%</Col>
                    </Panel>
                    </Collapse>
                </Col>
            ))}
      </Row>
    </>
  );
}

export default Exchanges
