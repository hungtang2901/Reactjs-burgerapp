import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
//import MenuLogo from '../../../assets/images/baseline_menu_black_18dp.png'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
        <div>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            
        </div>
        <div className={classes.Logo}>
        <Logo />
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
    )
   
}
export default toolbar;