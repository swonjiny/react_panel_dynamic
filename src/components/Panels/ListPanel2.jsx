// components/Panels/ListPanel.jsx
import {useEffect, useState} from "react";

function ListPanel() {
    const [selected, setSelected] = useState(1)
    const [items, setItems] = useState([])

    const alertEvent = () => {
        alert('경고')
    }


    useEffect(() => {
        setSelected(1)
        setItems([
            { id: 1, title: '리스트 1', value: 'a100' },
            { id: 2, title: '리스트 2', value: 'a200' },
            { id: 3, title: '리스트 3', value: 'a300' },
        ])
    }, []);
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
            <select name="selected" id="selected" value={selected} onChange={e => setSelected(e.target.value)}>
                <option value={1}> 1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button onClick={alertEvent}>알람</button>
        </div>
    );
}

export default ListPanel;
