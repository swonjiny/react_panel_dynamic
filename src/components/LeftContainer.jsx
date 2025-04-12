import React from 'react';
import LeftPanel from "@/components/Layout/LeftPanel.jsx";
import DynamicComponent from "@/components/DynamicComponent.jsx";

const LeftContainer = ({LeftNavPanel , LeftWorkPanel}) => {
    return (
        <div className="left-floating-panels">
            <LeftPanel
                position="top"
                title="첫번째"
                isVisible={true}
            >
                {LeftNavPanel && <DynamicComponent path={LeftNavPanel}/>}

            </LeftPanel>
            <LeftPanel
                position="bottom"
                title="두번째"
                isVisible={true}
            >
                {LeftWorkPanel && <DynamicComponent path={LeftWorkPanel}/>}
            </LeftPanel>
        </div>
    );
};

export default LeftContainer;
