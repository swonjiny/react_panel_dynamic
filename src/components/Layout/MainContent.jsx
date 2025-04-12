// 그리드 레이아웃 예시
import {useEffect, useState} from "react";
import ChartPanel from "@/components/Panels/ChartPanel.jsx";
import ListPanel from "@/components/Panels/ListPanel.jsx";
import LeftPanel from "@/components/Layout/LeftPanel.jsx";
import Scene3D from "@/components/Panels/3D/Scene3D.jsx";
import DynamicComponent from "@/components/DynamicComponent.jsx";
import axios from "axios";
import LeftContainer from "../LeftContainer.jsx";


export default function MainContent({tabIndex , setTabIndex ,tabs, setTabs}) {
    const [panels, setPanels] = useState({
        leftNav: {
            isVisible: true,
            isCollapsed: false
        },
        leftWork: {
            isVisible: true,
            isCollapsed: false
        },
        rightTop: {
            isVisible: true,
            isCollapsed: false
        },
        rightBottom: {
            isVisible: true,
            isCollapsed: false
        }
    });

    const [LeftNavPanel, setLeftNavPanel] = useState('')
    const [LeftWorkPanel, setWorkPanel] = useState('')
    // 판넬 업애기
    const handlePanelClose = (panelId) => {
        setPanels(prev => ({
            ...prev,
            [panelId]: {
                ...prev[panelId],
                isVisible: false
            }
        }));
    };
    // 판넬 닫고 열기
    const handlePanelToggle = (panelId) => {
        setPanels(prev => ({
            ...prev,
            [panelId]: {
                ...prev[panelId],
                isCollapsed: !prev[panelId].isCollapsed
            }
        }));
    };

    const modifyTab = () => {
        console.log(tabIndex)
        tabs.map((tab, index) => ( index === tabIndex ? {...tab , content : (
                <div className="floating-panels-container">
                    <LeftContainer LeftNavPanel={'/src/components/Layout/Footer.jsx' }  LeftWorkPanel={'/src/components/Panels/ListPanel2.jsx'} />
                </div>
            )} : tab))
    }

    const addTab = () => {
        console.log('더하기')
        axios('/api/panel.json')
            .then(res => {
                console.log(res.data);
                console.log(tabIndex);
                const panel = res.data.filter(item => item.id === tabIndex)[0]
                console.log(panel)
                setPanels(panel)
                setLeftNavPanel(panel.leftNav.path)
                setWorkPanel(panel.leftWork.path)

            })
        setTabs([...tabs , {label : '신규탭' + tabs.length , content : (
                <div className="floating-panels-container">
                    {/* Left Panels */}

                    <LeftContainer LeftNavPanel={LeftNavPanel }  LeftWorkPanel={LeftWorkPanel} />
                    {/*<div className="left-floating-panels">*/}
                    {/*    <LeftPanel*/}
                    {/*        position="top"*/}
                    {/*        isVisible={panels.leftNav.isVisible}*/}
                    {/*        isCollapsed={panels.leftNav.isCollapsed}*/}
                    {/*        onClose={() => handlePanelClose('leftNav')}*/}
                    {/*        onToggle={() => handlePanelToggle('leftNav')}*/}
                    {/*        title="차트 패널"*/}
                    {/*    >*/}
                    {/*        <ChartPanel/>*/}
                    {/*        <Scene3D/>*/}
                    {/*    </LeftPanel>*/}

                    {/*    <LeftPanel*/}
                    {/*        position="bottom"*/}
                    {/*        isVisible={panels.leftWork.isVisible}*/}
                    {/*        isCollapsed={panels.leftWork.isCollapsed}*/}
                    {/*        onClose={() => handlePanelClose('leftWork')}*/}
                    {/*        onToggle={() => handlePanelToggle('leftWork')}*/}
                    {/*        title="리스트 패널"*/}
                    {/*    >*/}
                    {/*        fk*/}
                    {/*        {LeftNavPanel && <DynamicComponent path={LeftNavPanel}/>}*/}

                    {/*        /!*{LeftNavPanel && LeftNavPanel}*!/*/}
                    {/*        /!*<ListPanel />*!/*/}
                    {/*    </LeftPanel>*/}
                    {/*</div>*/}
                </div>
            )
        }])
    }

    useEffect(() => {

        console.log(tabIndex)
    }, [tabIndex]);

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
