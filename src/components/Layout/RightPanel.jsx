// components/Layout/RightPanel.jsx
function RightPanel({ position, isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className={`floating-panel right-panel ${position}`}>
            <div className="panel-header">
                <h3>우측 패널 - {position}</h3>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="panel-content">
                {/* 패널 내용 */}
            </div>
        </div>
    );
}

export default RightPanel;
