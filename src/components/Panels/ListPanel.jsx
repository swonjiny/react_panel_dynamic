// components/Panels/ListPanel.jsx
function ListPanel() {
    const items = [
        { id: 1, title: '항목 1', value: 100 },
        { id: 2, title: '항목 2', value: 200 },
        { id: 3, title: '항목 3', value: 300 },
    ];

    return (
        <div className="list-panel">
            <ul className="list-container">
                {items.map(item => (
                    <li key={item.id} className="list-item">
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPanel;
