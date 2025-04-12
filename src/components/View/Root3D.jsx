import React from 'react';
import View from "../../components/View/index.jsx";

const Root3D = () => {
    return (
        <div>
            <h2>3D 모델 렌더링</h2>
            <View
                modelPath="/models/AnimatedPlatformerCharacter.glb"
                skyPreset="dawn"
                cameraPosition={[5, 2, 5]}
            />
        </div>

    );
};

export default Root3D;
