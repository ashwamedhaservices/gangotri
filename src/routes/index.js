// Routes and Navigations
import { Navigate, useRoutes } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';

// Pages
import {
  LoginPage,
  CoursePage,
  SubjectPage,
  ChapterPage,
  TopicPage,
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
      element: token ?  <Navigate to="/dashboard/course" /> : <LoginPage />,
    },
    {
      path: '/dashboard',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/course" />, index: true },
        // { path: 'app', element: <DashboardAppPage /> },
        { path: 'course', element: <CoursePage />,},
        { path: 'course/:course_name/subject', element: <SubjectPage />,},
        { path: 'course/:course_name/subject/:subject_name/chapter', element: <ChapterPage />,},
        { path: 'course/:course_name/subject/:subject_name/chapter/:chapter_name/topic', element: <TopicPage />,},
        // { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/course" />, index: true },
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
