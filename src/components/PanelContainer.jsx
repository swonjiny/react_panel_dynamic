import React, {useEffect, useState} from 'react';
import LeftPanel from "../components/Layout/LeftPanel.jsx";
import DynamicComponent from "../components/DynamicComponent.jsx";
import RightPanel from "../components/Layout/RightPanel.jsx";

const PanelContainer = ({panelInfo}) => {
    const [panel, setPanel] = useState({})
    useEffect(() => {
        setPanel(panelInfo)
        console.log(panelInfo)
    }, []);

    // 판넬 닫고 열기
    const handlePanelToggle = (panelId) => {
        setPanel(prev => ({
            ...prev, [panelId]: {
                ...prev[panelId], isCollapsed: !prev[panelId].isCollapsed
            }
        }));
    };
    // 판넬 제거
    const handlePanelClose = (panelId) => {
        setPanel(prev => ({
            ...prev, [panelId]: {
                ...prev[panelId], isVisible: !prev[panelId].isVisible
            }
        }));
    };
    return (<div>
            <div className="left-floating-panels">
                <LeftPanel
                    position="top"
                    title="첫번째"
                    isVisible={panel?.leftNav?.isVisible ?? true}
                    isCollapsed={panel?.leftNav?.isCollapsed ?? true}
                    onToggle={() => handlePanelToggle('leftNav')}
                    onClose={() => handlePanelClose('leftNav')}
                >
                    {panel.leftNav && <DynamicComponent path={panel?.leftNav?.path ?? ''}/>}

                </LeftPanel>
                <LeftPanel
                    position="bottom"
                    title="두번째"
                    isVisible={panel?.leftWork?.isVisible ?? true}
                    isCollapsed={panel?.leftWork?.isCollapsed ?? true}
                    onToggle={() => handlePanelToggle('leftWork')}
                    onClose={() => handlePanelClose('leftWork')}
                >
                    {panel?.leftWork && <DynamicComponent path={panel?.leftWork?.path ?? ''}/>}
                </LeftPanel>
            </div>
        <div className="right-floating-panels">
            <RightPanel
                position="top"
                title="첫번째"
                isVisible={panel?.rightTop?.isVisible?? true}
                isCollapsed={panel?.rightTop?.isCollapsed?? true}
                onToggle={() =>handlePanelToggle('rightTop')}
                onClose={()=>handlePanelClose('rightTop')}
            >
                {panel.rightTop && <DynamicComponent path={panel?.rightTop?.path??''}/>}

            </RightPanel>
            <RightPanel
                position="bottom"
                title="두번째"
                isVisible={panel?.rightBottom?.isVisible?? true}
                isCollapsed={panel?.rightBottom?.isCollapsed?? true}
                onToggle={() =>handlePanelToggle('rightBottom')}
                onClose={()=>handlePanelClose('rightBottom')}
            >
                {panel.rightBottom && <DynamicComponent path={panel?.rightBottom?.path??''}/>}
            </RightPanel>
        </div>
        </div>);
};

export default PanelContainer;
