import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconPigMoney,
  IconWallet,
  IconNotification,
  IconSettings,
  IconMoodDollar,
  IconHome,
  IconMoneybag,
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimpleColored.module.css';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/savingpots', label: 'Saving Pots', icon: IconPigMoney },
  { link: '/expenses', label: 'Expenses', icon: IconWallet },
  { link: '/income', label: 'Income', icon: IconMoneybag },
  { link: '/reminders', label: 'Reminders', icon: IconNotification },
  { link: '/accountsettings', label: 'Account Settings', icon: IconSettings },
];

export function Navbar() {
  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => 
        isActive ? `${classes.link} ${classes.activeLink}` : classes.link
      }
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <IconMoodDollar size={28} inverted className={classes.icon} />
            <span>BudgetTracker</span>
          </div>
        </div>
        {links}
      </div>

      <div className={classes.footer}>
        <NavLink to="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}
