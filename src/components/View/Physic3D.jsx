import React from 'react';
import View from "../../components/View/index.jsx";

const Physic3D = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <h2>물리 엔진이 적용된 3D 씬</h2>
            <View
                enablePhysics={true}
                skyPreset="night"
                showStats={true}
                backgroundColor="#050505"
            />
        </div>

    );
};

export default Physic3D;
