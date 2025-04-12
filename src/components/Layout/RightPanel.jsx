// components/Layout/RightPanel.jsx
import {IoChevronDown, IoChevronUp, IoClose} from "react-icons/io5";

function RightPanel({ position, isVisible, onClose, onToggle, children, title, isCollapsed }) {
    if (!isVisible) return null;

    return (
        <div className={`floating-panel right-panel ${position} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="panel-header">
                <h3>{title} 우측 패널 - {position}</h3>
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

export default RightPanel;
