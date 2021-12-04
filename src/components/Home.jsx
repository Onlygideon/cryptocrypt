import millify from "millify"
import { Typography, Row, Col, Statistic } from "antd"
import { Link } from "react-router-dom"


import { useGetCryptoStatsQuery } from "../services/cryptoStatsApi";
import { Cryptocurrencies, News } from ".";
import Loader from "./Loader";

const { Title } = Typography;


const Homepage = () => {
    const { data, isFetching } = useGetCryptoStatsQuery(10);

    const theStats = data?.data?.stats

    if(isFetching) return <Loader />

    return (
        <>
         <Title level={2} className="heading">
            Global Cryptocurrency Statistics
         </Title>

         <Row>
             <Col span={24} style={{fontWeight: '700'}}><Statistic title="Total Cryptocurrencies" value={theStats.total}/></Col>
             <Col span={12} style={{fontWeight: '700'}}><Statistic title="Total Exchanges" value={millify(theStats.totalExchanges)}/></Col>
             <Col span={12} style={{fontWeight: '700'}}><Statistic title="Total Market Cap" value={millify(theStats.totalMarketCap)}/></Col>
             <Col span={12} style={{fontWeight: '700'}}><Statistic title="Total 24h Volume" value={millify(theStats.total24hVolume)}/></Col>
             <Col span={12} style={{fontWeight: '700'}}><Statistic title="Total Market" value={millify(theStats.totalMarkets)}/></Col>
         </Row>

        <br />
         <div className="home-heading-container">
            <Title level={2} className="home-title">Market Trend:<br/>
            Top Cryptos</Title>
            <Title level={3} className="show-more"><Link to="/cryptocurrencies" style={{color: 'slateblue'}}>More</Link></Title>
         </div>
         <Cryptocurrencies simplified/>

        <br />
         <div className="home-heading-container">
            <Title level={2} className="home-title">24hr News</Title>
            <Title level={3} className="show-more"><Link to="/news" style={{color: 'slateblue'}}>More</Link></Title>
         </div>
         <News simplified/>
        </>
    )
}

export default Homepage
