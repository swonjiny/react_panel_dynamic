// components/Layout/Layout.jsx
import {useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';

import './Layout.css';
import './Header.css';
import './Panels.css';
import './Footer.css';

import Root3D from "@/components/View/Root3D.jsx";
import Default3D from "@/components/View/Default3D.jsx";
import Physic3D from "@/components/View/Physic3D.jsx";


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
                {/*<Root3D/>*/}
                {/*<Default3D/>*/}
                {/*<Physic3D/>*/}
            </div>

            <Footer />
        </div>
    );
}

export default Layout;
