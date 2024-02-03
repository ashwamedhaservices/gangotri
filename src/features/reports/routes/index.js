import PayoutReport from "../components/payout-reports";
import Reports from "../components/reports";
import UploadPayout from "../components/uploadPayout";

const PayoutRoutes = [
  {path:'reports', element:<Reports/>},
  
  { path: 'reports/payout-report', element: <PayoutReport/> },
  { path: 'reports/uploadPayout', element: <UploadPayout/> }
 
];

export default PayoutRoutes;