import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconPigMoney,
  IconWallet,
  IconNotification,
  IconMoodDollar,
  IconHome,
  IconMoneybag,
  IconTool,
  IconCalculator,
  IconChevronDown,
  IconChevronUp
} from '@tabler/icons-react';
import classes from './NavbarSimpleColored.module.css';

const data = [
  { link: '/', label: 'Dashboard', icon: IconHome },
  { link: '/savings', label: 'Savings', icon: IconPigMoney },
  { link: '/expenses', label: 'Expenses', icon: IconWallet },
  { link: '/income', label: 'Income', icon: IconMoneybag },
  { link: '/reminders', label: 'Reminders', icon: IconNotification },
  {
    label: 'Tools',
    icon: IconTool,
    links: [
      { label: 'Finance Calculator', link: '/todo', icon: IconCalculator },
    ],
  },
];

export function Navbar({ isAuthenticated }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // If not authenticated, return null (don't render anything)
  if (!isAuthenticated) {
    return null;
  }

  const links = data.map((item) => {
    if (item.links) {
      return (
        <div key={item.label} className={classes.dropdown}>
          <div
            className={classes.link}
            onClick={toggleDropdown}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
            {dropdownOpen ? <IconChevronUp size={20} className={classes.chevron} /> : <IconChevronDown size={20} className={classes.chevron} />}
          </div>
          {dropdownOpen && (
            <div className={classes.dropdownContent}>
              {item.links.map((subItem) => (
                <NavLink
                  key={subItem.label}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.link} ${classes.activeLink}`
                      : classes.link
                  }
                  to={subItem.link}
                >
                  <subItem.icon className={classes.linkIcon} stroke={1.5} />
                  <span>{subItem.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
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
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <span>Moolah</span>
          </div>
        </div>
        {links}
      </div>

      <div className={classes.footer}></div>
    </nav>
  );
}