// components/Layout/Header.jsx
import {Link} from "react-router-dom";


function Header() {
    return (
        <header className="header">
            <div className="logo">로고</div>
            <nav className="main-nav">
                <ul className="horizontal-menu">
                    <li><Link to={"/"}>홈</Link></li>
                    <li><Link to={"/about"}>소개</Link></li>
                    <li><Link to={"/service"}>서비스</Link></li>
                    <li><Link to={"/etc"}>etc</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
