// Routes and Navigations
import { Navigate, useRoutes } from 'react-router-dom';
import { TextEditor } from '../components/rich-text-editor';
import coursesRoutes from '../features/course/routes';
import meetingRoutes from '../features/meetings/routes';
import onboardingRoutes from '../features/onboarding/routes';
import quizRoutes from '../features/quiz/routes';

// Layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';

// Pages
import {
  LoginPage,
  Page404,
  ProductsPage,
  DashboardAppPage,
} from '../pages';

// Storage
import { storageGetItem } from '../service/ash_admin';

export default function Router() {
  const token = storageGetItem('token');

  const routes = useRoutes([
    {
      path: '/login',
      element: token ?  <Navigate to="/course" /> : <LoginPage />,
    },
    {
      path: '/',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/course" />, index: true },
        ...coursesRoutes,
        ...onboardingRoutes,
        ...quizRoutes,
        ...meetingRoutes,
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'app', element: <DashboardAppPage /> },
        { path: 'test', element: <TextEditor /> }
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/course" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
