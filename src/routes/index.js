import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import BlogPage from '../pages/BlogPage';
import CoursePage from '../pages/CoursePage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import { AuthContext } from '../context/authentication/authContextProvider';
import SubjectPage from '../pages/SubjectPage';
import ChapterPage from '../pages/ChapterPage';
import TopicPage from '../pages/TopicPage';
import { storageGetItem } from '../service/ash_admin';

// ----------------------------------------------------------------------

export default function Router() {
  const { isSignedIn } = useContext(AuthContext);
  const token = storageGetItem('token');

  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
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
        // { path: 'subject', element: <SubjectPage />,},
        // { path: 'chapter', element: <ChapterPage />,},
        // { path: 'topic', element: <TopicPage />,},
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
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
