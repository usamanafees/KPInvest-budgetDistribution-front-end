import { Settings, PieChart, LogOut, Home, MessageCircle, Users, HelpCircle } from 'react-feather'

const renderLogout = () => {
  console.log("hereeeeeerererre")
  // localStorage.removeItem('login')
}

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
    disabled: true,
    icon: <PieChart size={20} />,
    navLink: '/'
  },
  {
    id: 'teams',
    title: 'Tags',
    icon: <Users size={20} />,
    navLink: '/teams'
  },
  {
    id: 'questions',
    title: 'Question',
    icon: <HelpCircle size={20} />,
    navLink: '/questions'
  },
  {
    id: 'feedback',
    title: 'User Feedback',
    icon: <MessageCircle size={20} />,
    navLink: '/feedback'
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
    action: 'logout',
    navLink: '/login'
  }
]
