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

const Profile = React.lazy(() => import('./views/Profile/Profile'));
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

  { path: '/certificates', name: 'Certificates', component: Certificates },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/:id', exact: true, name: 'Page 404', component: Page404 }
];

export default routes;