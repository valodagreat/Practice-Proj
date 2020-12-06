import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../State/StateProvider/StateProvider';
import { auth } from '../../firebase';

function Header() {

    const [{basket,user}] = useStateValue();

    const handleAuthentication = () => {
        if(user) auth.signOut();
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img src="https://res.cloudinary.com/valodagreat/image/upload/v1606824330/automotive_m4cfko.jpg" alt="logo" className='header_logo'/> 
            </Link>
            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <SearchIcon className='header_searchIcon' /> 
            </div>
            <div className="header_nav">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="header_option">
                        <span className="header_optionLineOne">
                            Hello {user? user.email: 'User'}
                        </span>
                        <span className="header_optionLineTwo">
                            {user? 'Sign Out': 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to='/orders'>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Returns
                    </span>
                    <span className="header_optionLineTwo">
                        & Orders
                    </span>
                </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Your
                    </span>
                    <span className="header_optionLineTwo">
                        Prime
                    </span>
                </div>
                <Link to='/checkout' >
                    <div className="header_optionBasket">
                        <ShoppingBasket />
                        <span className="header_optionLineTwo header_basketCount">
                            {basket?.length}
                        </span> 
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
