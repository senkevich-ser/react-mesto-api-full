import React from "react";
import {useHistory} from 'react-router-dom';

function NavMenu({userMail}){
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    history.push('/sign-in');
  }
  
  return(
    <div className="header__menu">
    <p className="header__button">{userMail}</p>
    <button onClick={signOut}className="header__button opacity">Выйти</button>
    </div>
  )
}

export default NavMenu;