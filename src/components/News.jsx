import { useState } from 'react';
import { Select, Card, Typography, Row, Col, Avatar } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptoStatsQuery } from '../services/cryptoStatsApi';
import Loader from './Loader';


const { Title, Text } = Typography;
const { Option } = Select;

const initialImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'


const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const { data: cryptoNews} = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });

    const { data } = useGetCryptoStatsQuery(100);


    if(!cryptoNews?.value) return <Loader />

    return (
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select showSearch className="select-news" placeholder="Select Cryptocurrency" 
                            optionFilterProp="children" onChange={(theValue) => setNewsCategory(theValue)} 
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
                            }>
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {data?.data?.coins.map((coin) => <Option value={coin.name}>{`${coin.symbol}`} {coin.name}</Option>)}
                        </Select>
                    </Col>
                )}
                
                {cryptoNews?.value.map((news, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={5}>{news.name}</Title>
                                    <img style={{ maxWidth: '150px', maxHeight: '100px', borderRadius: '10px'}} src={news?.image?.thumbnail?.contentUrl || initialImage} alt={news.name}/>
                                </div>

                                <p>
                                    {news.description > 100 ? `${news.description.subString(0, 100)}...` : news.description}
                                </p>

                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || initialImage} alt="news"/>
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>  
    )
}

export default News
