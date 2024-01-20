// component
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import SchemaIcon from '@mui/icons-material/Schema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    path: '/payout-report',
    icon: <AssessmentIcon/>,
   }
];

export default navConfig;

