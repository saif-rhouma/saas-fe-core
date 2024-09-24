import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));

export function Router() {
  // const { permissions } = usePermissionsContext();
  // useEffect(() => {
  //   console.log('------->> permissions', permissions.includes(PermissionsType.VIEW_ORDER));
  //   if (permissions?.length) {
  //     if (!permissions.includes(PermissionsType.LIST_ORDER)) {
  //       console.log('---> Remove LIST_ORDER');
  //       const indexToRemove = 1;
  //       dashboardRoutes[0].children[1].children.splice(indexToRemove, 1);
  //     }
  //     if (!permissions.includes(PermissionsType.VIEW_ORDER)) {
  //       console.log('---> Remove VIEW_ORDER');
  //       const indexToRemove = 2;
  //       dashboardRoutes[0].children[1].children.splice(indexToRemove, 1);
  //     }
  //     // if (!permissions.includes(PermissionsType.ADD_ORDER)) {
  //     //   console.log('---> Remove ADD_ORDER');
  //     //   const indexToRemove = 3;
  //     //   dashboardRoutes[0].children[1].children.splice(indexToRemove, 1);
  //     // }
  //     // if (!permissions.includes(PermissionsType.EDIT_ORDER)) {
  //     //   console.log('---> Remove EDIT_ORDER');
  //     //   const indexToRemove = 4;
  //     //   dashboardRoutes[0].children[1].children.splice(indexToRemove, 1);
  //     // }
  //   }

  //   console.log("'---> dashboardRoutes'", dashboardRoutes);
  // }, [permissions]);

  return useRoutes([
    {
      path: '/',
      /**
       * Skip home page
       * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
       */
      element: (
        <Suspense fallback={<SplashScreen />}>
          <MainLayout>
            <HomePage />
          </MainLayout>
        </Suspense>
      ),
    },

    // Auth
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // Components
    ...componentsRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
