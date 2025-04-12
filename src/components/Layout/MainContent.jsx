// 그리드 레이아웃 예시
import {useEffect, useState} from "react";

import axios from "axios";
import PanelContainer from "../PanelContainer.jsx";
import {useLocation} from "react-router-dom";
import { Button, Space, Tooltip } from 'antd';

import { PlusOutlined, HomeOutlined, ToolOutlined, InfoCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import DynamicComponent from "@/components/DynamicComponent.jsx";

export default function MainContent({tabIndex , setTabIndex ,tabs, setTabs}) {
    const [panelList, setPanelList] = useState([])
    const location = useLocation();
    //
    const addView = (srcPath) => {
        setTabs(tabs.map((tab, index) => ( index === tabIndex ? {...tab , viewer : (
                <div style={{
                    position: 'fixed',
                    top: '300px',
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden'
                }}>
                    <DynamicComponent path={srcPath}/>
                </div>
            )} : tab)))
    }


    const modifyTab = (pathName) => {

        const panel = panelList.filter(panel => panel.url === (pathName === 'home' ? "" : pathName))[0]
        setTabs(tabs.map((tab, index) => ( index === tabIndex ? {...tab , content : (
                <div className="floating-panels-container">
                    <PanelContainer panelInfo={panel}  />
                </div>
            )} : tab)))
    }

    const addTab = () => {
        const pathName = location.pathname.replace("/","")
        const panel = panelList.filter(panel => panel.url === pathName )[0]
        setTabs([...tabs , {label : (pathName === '' ? '홈' : pathName )+ tabs.length , content : (
                <div className="floating-panels-container">
                    {/* Panels */}
                    <PanelContainer panelInfo={panel} style={{zIndex: 1000}}/>

                </div>
            )
        }])
    }



    useEffect(() => {
        axios('/api/panel.json')
            .then(res => {
                setPanelList(res.data)
            })
    }, []);
    useEffect(() => {
        console.log("tabs 상태가 업데이트됨:", tabs);
    }, [tabs]);

    return (
        <div>

            <div className="main-content" style={{width: "100%", justifyContent: "center"}}>
                <div className="tab-container">
                    <Space style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '16px 0',
                        background: '#f0f2f5',
                        padding: '12px',
                        borderRadius: '8px'
                    }}>
                    {tabs.map(({label}, index) => (
                        <Button
                            key={index}
                            className={`tab ${tabIndex === index ? 'active' : ''}`}
                            onClick={() => setTabIndex(index)}
                            type={tabIndex === index ? 'primary' : 'default'}
                        >
                            {label}
                        </Button>

                    ))}
                        <Tooltip title="새 탭 추가">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={addTab}
                            >
                                탭 추가
                            </Button>
                        </Tooltip>

                        <Tooltip title="뷰어 추가">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={addView}
                            >
                                뷰어 추가
                            </Button>
                        </Tooltip>
                    </Space>

                    <Space style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '16px 0',
                        background: '#f0f2f5',
                        padding: '12px',
                        borderRadius: '8px'
                    }}>


                        <Button
                            type="default"
                            icon={<HomeOutlined />}
                            onClick={() => modifyTab('home')}
                        >
                            홈 패널 변경
                        </Button>

                        <Button
                            type="default"
                            icon={<ToolOutlined />}
                            onClick={() => modifyTab('service')}
                        >
                            서비스 변경
                        </Button>

                        <Button
                            type="default"
                            icon={<InfoCircleOutlined />}
                            onClick={() => modifyTab('about')}
                        >
                            소개 변경
                        </Button>

                        <Button
                            type="default"
                            icon={<EllipsisOutlined />}
                            onClick={() => modifyTab('etc')}
                        >
                            기타 변경
                        </Button>
                    </Space>
                    <Space style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '16px 0',
                        background: '#f0f2f5',
                        padding: '12px',
                        borderRadius: '8px'
                    }}>


                        <Button
                            type="default"

                            onClick={() => addView('/src/components/View/Default3D.jsx')}
                        >
                            default 뷰어
                        </Button>

                        <Button
                            type="default"

                            onClick={() => addView('/src/components/View/Physic3D.jsx')}
                        >
                            Physic3D 뷰어
                        </Button>

                        <Button
                            type="default"

                            onClick={() => addView('/src/components/View/Root3D.jsx')}
                        >
                            물리뷰어
                        </Button>
                        <Button
                            type="default"

                            onClick={() => addView('/src/components/View/ZoomableScene3D.jsx')}
                        >
                            버튼뷰어
                        </Button>



                    </Space>
                </div>
                <div className="content-wrapper">
                    {
                        tabs.map((tab, index) => {
                            return (

                                <div
                                    key={index}
                                    style={{ display: index === tabIndex ? 'block' : 'none' }}
                                >
                                    {tab.content}
                                    {tab.viewer}
                                </div>



                            );
                        })
                    }
                </div>
            </div>

        </div>
    );
}
