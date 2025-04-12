// components/Layout/LeftPanel.jsx
import { useState } from 'react';
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5"; // react-icons 사용

function LeftPanel({ position, isVisible, onClose, onToggle, children, title, isCollapsed }) {
    if (!isVisible) return null;

    return (
        <div className={`floating-panel left-panel ${position} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="panel-header">
                <h3>{title || `좌측 패널 - ${position}`}</h3>
                <div className="panel-controls">
                    <button className="control-button toggle-button" onClick={onToggle}>
                        {isCollapsed ? <IoChevronDown /> : <IoChevronUp />}
                    </button>
                    <button className="control-button close-button" onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
            </div>
            <div className={`panel-content ${isCollapsed ? 'hidden' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default LeftPanel;
