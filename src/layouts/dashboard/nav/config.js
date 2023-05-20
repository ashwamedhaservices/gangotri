// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'course',
    path: '/dashboard/course',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'subject',
  //   path: '/dashboard/subject',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'chapter',
  //   path: '/dashboard/chapter',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'topic',
  //   path: '/dashboard/topic',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'products',
  //   path: '/dashboard/products',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

// COURSE > 10TH > SUJECTS > ENGLISH >
// COURSE > 10TH > SUJECTS > ENGLISH > CHAPTERS > CH01 > TOPICS
