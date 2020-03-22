import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Dashboard = React.lazy(() => import('./views/Admin/Dashboard'));
// Devices
const D_Total = React.lazy(() => import('./views/Admin/Devices/Total'));
const D_Calibration = React.lazy(() => import('./views/Admin/Devices/Calibration'));
const D_Transmission = React.lazy(() => import('./views/Admin/Devices/Transmission'));
const D_Cable = React.lazy(() => import('./views/Admin/Devices/Cable'));
const D_Device = React.lazy(() => import('./views/Admin/Devices/Device'));
const D_Energy = React.lazy(() => import('./views/Admin/Devices/Energy'));
const D_Table = React.lazy(() => import('./views/Admin/Devices/Table'));
// Certificates
const Certificates = React.lazy(() => import('./views/Admin/Certificates'));
// SPK
const Requests = React.lazy(() => import('./views/Admin/Requests/Calibration'));
// Schedules
const Schedules = React.lazy(() => import('./views/Admin/Schedules'));

const Profile = React.lazy(() => import('./views/Profile/Profile'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/devices', exact: true, name: 'Devices', component: D_Total },
  { path: '/devices/tot', name: 'Total', component: D_Total },
  { path: '/devices/cal', name: 'Calibration', component: D_Calibration },
  { path: '/devices/tra', name: 'Transmission', component: D_Transmission },
  { path: '/devices/cab', name: 'Cable', component: D_Cable },
  { path: '/devices/dev', name: 'Device', component: D_Device },
  { path: '/devices/ene', name: 'Energy', component: D_Energy },
  { path: '/devices/table/:lab', exact: true, name: 'Table', component: D_Table },
  { path: '/devices/table/:lab/:type/:status', exact: true, name: 'Table', component: D_Table },

  { path: '/requests', exact: true, name: 'Requests', component: Requests },

  { path: '/schedules', exact: true, name: 'Schedules', component: Schedules },
  { path: '/schedules/cal', name: 'Calibration', component: Schedules },
  { path: '/schedules/tra', name: 'Transmission', component: Schedules },
  { path: '/schedules/cab', name: 'Cable', component: Schedules },
  { path: '/schedules/cpe', name: 'Device', component: Schedules },
  { path: '/schedules/ene', name: 'Energy', component: Schedules },

  { path: '/certificates', name: 'Certificates', component: Certificates },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/register', name: 'Register', component: Register },
  { path: '/:id', exact: true, name: 'Page 404', component: Page404 }
];

export default routes;
