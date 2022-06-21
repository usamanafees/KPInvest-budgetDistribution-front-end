import { Settings, PieChart, LogOut, Home } from 'react-feather'

export default [
  {
    header: 'Navigation'
  },
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <PieChart size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={20} />,
    navLink: '/settings'
    // children: [
    //   {
    //     id: 'list',
    //     title: 'List',
    //     icon: <Circle size={12} />,
    //     navLink: '/apps/user/list'
    //   },
    //   {
    //     id: 'view',
    //     title: 'View',
    //     icon: <Circle size={12} />,
    //     navLink: '/apps/user/view'
    //   },
    //   {
    //     id: 'edit',
    //     title: 'Edit',
    //     icon: <Circle size={12} />,
    //     navLink: '/apps/user/edit'
    //   }
    // ]
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: <LogOut size={20} />,
    navLink: '/login'
  }
]
