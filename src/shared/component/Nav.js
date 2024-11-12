import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="Nav">
             <ul>
                <li><Link to="/book">Books</Link></li>
                <li><Link to="/person">Peoples</Link></li>
            </ul>
        </nav>
    )
}

export default Nav