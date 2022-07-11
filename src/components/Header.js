import logo from '../assets/images/logo-small.png'
import {Link} from "react-router-dom";

const Header = () => {
    return <div>
        <header>
            <div className='logo-container'>
                <img src={logo} alt="payme logo"/>
            </div>
            <div className='links-container'>
                <ul>
                    <li>
                        <Link to={'/'}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={'/create_sale'}>Create Sale</Link>
                    </li>
                </ul>
            </div>
        </header>
    </div>


}

export default Header
