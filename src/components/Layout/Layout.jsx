// components/Layout/Layout.jsx
import {useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import MainContent from './MainContent';
import ChartPanel from '../Panels/ChartPanel';
import ListPanel from '../Panels/ListPanel';
import './Layout.css';
import axios from "axios";
import Scene3D from "../Panels/3D/Scene3D.jsx";
import DynamicComponent from "../DynamicComponent.jsx";


function Layout() {



    const [tabIndex, setTabIndex] = useState(0);
    // const tabs = [
    //     { label: '차트', content: <ChartPanel /> },
    //     { label: '리스트', content: <ListPanel /> }
    // ];

    const [tabs, setTabs] = useState([
        // { label: '차트', content: <ChartPanel /> }
    ])


    return (
        <div className="layout-container">
            <Header />

            <div className="content-area">

                <MainContent tabIndex={tabIndex} setTabIndex={setTabIndex} tabs={tabs} setTabs={setTabs}/>

                {/*<div className="floating-panels-container">*/}
                {/*    /!* Left Panels *!/*/}
                {/*    <div className="left-floating-panels">*/}
                {/*        <LeftPanel*/}
                {/*            position="top"*/}
                {/*            isVisible={panels.leftNav.isVisible}*/}
                {/*            isCollapsed={panels.leftNav.isCollapsed}*/}
                {/*            onClose={() => handlePanelClose('leftNav')}*/}
                {/*            onToggle={() => handlePanelToggle('leftNav')}*/}
                {/*            title="차트 패널"*/}
                {/*        >*/}
                {/*            <ChartPanel />*/}
                {/*            <Scene3D/>*/}
                {/*        </LeftPanel>*/}

                {/*        <LeftPanel*/}
                {/*            position="bottom"*/}
                {/*            isVisible={panels.leftWork.isVisible}*/}
                {/*            isCollapsed={panels.leftWork.isCollapsed}*/}
                {/*            onClose={() => handlePanelClose('leftWork')}*/}
                {/*            onToggle={() => handlePanelToggle('leftWork')}*/}
                {/*            title="리스트 패널"*/}
                {/*        >*/}
                {/*            fk*/}
                {/*            {LeftNavPanel && <DynamicComponent path={LeftNavPanel}/>}*/}
                {/*            /!*{LeftNavPanel && LeftNavPanel}*!/*/}
                {/*            /!*<ListPanel />*!/*/}
                {/*        </LeftPanel>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <Footer />
        </div>
    );
}

export default Layout;
