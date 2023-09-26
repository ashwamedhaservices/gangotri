import { CreateMeetingPage, MeetingsPage } from "../pages";

const meetingRoutes = [
  { path: 'meeting', element: <MeetingsPage /> },
  { path: 'meeting/create-meeting', element: <CreateMeetingPage />},
];

export default meetingRoutes;