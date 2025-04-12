// components/Layout/Header.jsx
function Header() {
    return (
        <header className="header">
            <div className="logo">로고</div>
            <nav className="main-nav">
                <ul>
                    <li><a href="/">홈</a></li>
                    <li><a href="/about">소개</a></li>
                    <li><a href="/service">서비스</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
