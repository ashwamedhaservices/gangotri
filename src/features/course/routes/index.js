import { ChapterPage, CoursePage, SubjectPage, TopicPage } from "../pages";

// Logged In Pages
const coursesRoutes = [
  { path: 'course', element: <CoursePage />,},
  { path: 'course/:course_name/subject', element: <SubjectPage />,},
  { path: 'course/:course_name/subject/:subject_name/chapter', element: <ChapterPage />,},
  { path: 'course/:course_name/subject/:subject_name/chapter/:chapter_name/topic', element: <TopicPage />,},
];

export default coursesRoutes;