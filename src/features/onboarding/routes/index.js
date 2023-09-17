import { OnboardingPage } from "../pages";
import { Address, AddressProofUpload } from "../components/address";
import { Nominee } from "../components/nominee";
import { Bank } from "../components/bank";
import { Pan, PanUpload } from '../components/kyc';

// Logged In Pages
const onboardingRoutes = [
  { path: 'onboarding', element: <OnboardingPage />},
  { path: 'pan', element: <Pan /> },
  { path: 'pan-upload', element: <PanUpload /> },
  { path: 'bank', element: <Bank /> },
  { path: 'address', element: <Address /> },
  { path: 'address-proof-upload', element: <AddressProofUpload /> },
  { path: 'nominee', element: <Nominee /> },
];

export default onboardingRoutes;