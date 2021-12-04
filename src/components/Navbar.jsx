import { useState, useEffect } from "react"
import { Button, Menu, Typography, Avatar } from "antd"
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import Logo from '../images/cryptic.png'



const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const doResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', doResize);

        doResize()

        return () => window.removeEventListener('resize', doResize);
    }, [])

    useEffect(() => {
        if(screenSize < 1098) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }

    }, [screenSize])



    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={Logo} size="large" style={{cursor: 'pointer'}} alt="logo"/>
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoCrypt</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>

            {activeMenu && (
                
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>

                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchange Platforms</Link>
                    </Menu.Item>

                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}

        </div>
    )
}

export default Navbar
