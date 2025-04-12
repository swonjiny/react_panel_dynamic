// 그리드 레이아웃 예시
import {useEffect, useState} from "react";

import axios from "axios";
import PanelContainer from "../PanelContainer.jsx";


export default function MainContent({tabIndex , setTabIndex ,tabs, setTabs}) {
    const [panelList, setPanelList] = useState([])
    const [panels, setPanels] = useState({
        // leftNav: {
        //     isVisible: true,
        //     isCollapsed: false
        // },
        // leftWork: {
        //     isVisible: true,
        //     isCollapsed: false
        // },
        // rightTop: {
        //     isVisible: true,
        //     isCollapsed: false
        // },
        // rightBottom: {
        //     isVisible: true,
        //     isCollapsed: false
        // }
    });



    const modifyTab = () => {
        console.log(tabIndex)
        const panel = panelList.filter(panel => panel.id === 1)[0]
        setTabs(tabs.map((tab, index) => ( index === tabIndex ? {...tab , content : (
                <div className="floating-panels-container">
                    <PanelContainer panelInfo={panel}  />
                </div>
            )} : tab)))
    }

    const addTab = () => {
        const panel = panelList.filter(panel => panel.id === tabs.length)[0]
        setTabs([...tabs , {label : '신규탭' + tabs.length , content : (
                <div className="floating-panels-container">
                    {/* Panels */}
                    <PanelContainer panelInfo={panel} />

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
                    {tabs.map(({label, content}, index) => (
                        <button
                            key={index}
                            className={`tab ${tabIndex === index ? 'active' : ''}`}
                            onClick={() => setTabIndex(index)}
                        >
                            {label}
                        </button>
                    ))}
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
                                </div>
                            );
                        })
                    }
                    <button onClick={addTab} style={{top: '0'}}>탭더하기</button>
                    <button onClick={modifyTab} style={{top: '0'}}>탭변경</button>
                </div>
            </div>

        </div>
    );
}
