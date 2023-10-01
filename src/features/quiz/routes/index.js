import { CreateQuestionPaperPage, TestableQuestionPaperContentPaperPage, TestableQuestionPaperPage } from "../pages";


const quizRoutes = [
  { path: 'paper/:testable_type/:testable_id', element: <CreateQuestionPaperPage />},
  { path: 'paper/:testable_type/:testable_id/testable', element: <TestableQuestionPaperPage />},
  { path: 'paper/:testable_type/:testable_id/testable/:paper_id', element: <TestableQuestionPaperContentPaperPage />},
];

export default quizRoutes;