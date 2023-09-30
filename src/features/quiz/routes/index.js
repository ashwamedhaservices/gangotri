import { CreateQuestionPaperPage, TestableQuestionPaperPage } from "../pages";


const quizRoutes = [
  { path: 'paper/:testable_type/:testable_id', element: <CreateQuestionPaperPage />},
  { path: 'paper/:testable_type/:testable_id/testable', element: <TestableQuestionPaperPage />},
];

export default quizRoutes;