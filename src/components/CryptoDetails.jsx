import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";

import { Row, Col, Typography } from 'antd';

import { DollarCircleOutlined, MoneyCollectOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, FundOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from "../services/cryptoStatsApi";
import Loader from "./Loader";

const { Title, Text } = Typography;




const CryptoDetails = () => {
    const { coinId } = useParams();

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    const cryptoDetails = data?.data?.coin

    if(isFetching) return <Loader />



    const stats = [
        { title: 'Price to USD', value: `$${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high', value: `$${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];    


    return (
      <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
                {cryptoDetails.name} ({cryptoDetails.slug}) Price
            </Title>
            <p className="coin-p">
                {cryptoDetails.name} Exchanges live price in $USD.
                View value statistics, market cap and supply.
            </p>
          </Col>

          <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics
                        </Title>
                    </Col>

                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Other Statistics
                        </Title>
                    </Col>

                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
          </Col>
          
          <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        What is {cryptoDetails.name}?
                    </Title>
                        {HTMLReactParser(cryptoDetails.description)}
                    
                </Row>

                <Col className="coin-links">
                    <Title className="coin-details-heading" level={3}>
                       Learn more about {cryptoDetails.name}
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>    
                    ))}
                </Col>
          </Col>
      </Col>
    )
}

export default CryptoDetails
