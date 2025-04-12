// components/Layout/FloatingPanel.jsx
import { lazy, Suspense } from 'react';

export default function FloatingPanel({ position, config }) {
    if (!config) return null;

    const DynamicComponent = lazy(() =>
        import(`../forms/${config.componentName}.jsx`)
    );

    return (
        <div className={`floating-panel ${position}`}>
            <Suspense fallback={<div>Loading...</div>}>
                <DynamicComponent {...config.props} />
            </Suspense>
        </div>
    );
}
