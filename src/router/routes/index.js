import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - DRG Invest'

// ** Default Route
const DefaultAdminRoute = '/home'
const DefaultUserRoute = '/survey'


// ** Merge Routes
const Routes = [
  {
    adminOnly: true,
    authenticated: true,
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    adminOnly: true,
    authenticated: true,
    path: '/dashboard',
    component: lazy(() => import('../../views/Dashboard'))
  },
  {
    adminOnly: true,
    authenticated: true,
    path: '/teams',
    component: lazy(() => import('../../views/Teams'))
  },
  {
    adminOnly: true,
    authenticated: true,
    path: '/questions',
    component: lazy(() => import('../../views/Questions'))
  },
  {
    adminOnly: true,
    authenticated: true,
    path: '/feedback',
    component: lazy(() => import('../../views/Feedback'))
  },
  {
    adminOnly: true,
    authenticated: true,
    path: '/settings',
    component: lazy(() => import('../../views/Settings'))
  },
  {
    adminOnly: false,
    authenticated: true,
    path: '/survey',
    component: lazy(() => import('../../views/SurveySheet')),
    layout: 'BlankLayout'
  },
  {
    adminOnly: false,
    authenticated: false,
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout'
  },
  {
    adminOnly: false,
    authenticated: false,
    path: '/forgotPassword',
    component: lazy(() => import('../../views/ForgotPassword')),
    layout: 'BlankLayout'
  },
  {
    adminOnly: false,
    authenticated: false,
    path: '/passwordReset',
    component: lazy(() => import('../../views/PasswordReset')),
    layout: 'BlankLayout'
  },
  {
    adminOnly: false,
    authenticated: false,
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }

  
]

export { DefaultAdminRoute, DefaultUserRoute, TemplateTitle, Routes }
