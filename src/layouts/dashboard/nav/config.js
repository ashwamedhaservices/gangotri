// component
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import SchemaIcon from '@mui/icons-material/Schema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
// ----------------------------------------------------------------------


const navConfig = [
  {
    title: 'course',
    path: '/course',
    icon: <AccountCircleIcon/>,
  },
  {
    title: 'onboarding',
    path: '/onboarding',
    icon: <SchemaIcon/>,
  },
  {
    title: 'meeting',
    path: '/meeting',
    icon: <GroupsIcon/>,
  },
  {
    title: 'report',
    path: '/reports',
    icon: <AssessmentIcon/>,
   },
   {
    title: 'users',
    path: '/search-user',
    icon: <GroupIcon/>,
  },
];

export default navConfig;

