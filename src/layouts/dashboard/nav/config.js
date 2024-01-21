// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'course',
    path: '/course',
    icon: icon('ic_user'),
  },
  {
    title: 'onboarding',
    path: '/onboarding',
    icon: icon('ic_lock'),
  },
  {
    title: 'meeting',
    path: '/meeting',
    icon: icon('ic_blog'),
  },
   {
    title: 'report',
   path: '/payout-report',
   icon: icon('ic_cart'),
   },
  // {
  //   title: 'chapter',
  //   path: '/chapter',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'topic',
  //   path: '/topic',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'products',
  //   path: '/products',
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
