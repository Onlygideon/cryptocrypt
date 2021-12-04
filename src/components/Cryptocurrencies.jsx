import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import millify from "millify"
import { Card, Input, Row, Col } from "antd"

import { useGetCryptoStatsQuery } from "../services/cryptoStatsApi"
import Loader from "./Loader"



const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;

    const { data: cryptoCoins, isFetching } = useGetCryptoStatsQuery(count);
   
    const [getCryptos, setGetCryptos] = useState(cryptoCoins?.data?.coins);

    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(() => {
        const filteredData = cryptoCoins?.data?.coins.filter((currency) => currency.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setGetCryptos(filteredData)

    }, [cryptoCoins, searchTerm])

    if(isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                 <div className="search-crypto">
                 <Input placeholder="Search CryptoCrypt" onChange={(e) => setSearchTerm(e.target.value)}
                     style={{borderRadius: '20px', padding: '0.5rem'}}
                 />
                 </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {getCryptos?.map((coin) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
                        <Link to={`/cryptocurrency/${coin.id}`}>
                            <Card title={`${coin.rank}. ${coin.name}`} extra={<img className="crypto-image" alt={`${coin.name}`} src={`${coin.iconUrl}`}/>} hoverable>
                                <p>{`${coin.symbol}`}</p>
                                <p>Price: ${millify(`${coin.price}`)}</p>
                                <p>Market Cap: {millify(`${coin.marketCap}`)}</p>
                                <p>Daily Change: {millify(`${coin.change}`)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
