import { useContext, createContext } from 'react';
import { getAllQuestionPapers, getQuestionPaperContentById, postQuestionPaper } from '../../../service/ash_admin';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {

  // const _createMeeting = async (meetings) => {
  //   try {
  //     const payload = { meetings: meetings };
  //     console.log(`[QuizContextProvider]::[_createMeeting]:: Enter ${payload}`);
  //     const data = await postMeetings(payload);
  //     console.log("[QuizContextProvider]::[_createMeeting]::", data);
  //     return data
  //   } catch (error) {
  //     console.error("[QuizContextProvider]::[_createMeeting]::err", error);
  //     return {}
  //   }
  // };

  // const _fetchMeetingsData = async () => {
  //   try {
  //     const meetings = await getMeetings();
  //     console.log("[QuizContextProvider]::[_fetchMeetingsData]::", meetings);
  //     return meetings;
  //   } catch (error) {
  //     console.error("[QuizContextProvider]::[_fetchMeetingsData]::err", error);
  //     return {};
  //   }
  // };

  const _fetchAllQuestionPapers = async ({testable_type, testable_id}) => {
    try {
      const papers = await getAllQuestionPapers({ testable_type, testable_id });
      console.log("[QuizContextProvider]::[_fetchAllQuestionPapers]::", papers);
      return papers;
    } catch (error) {
      console.error("[QuizContextProvider]::[_fetchAllQuestionPapers]::err", error);
      return [];
    }
  }
  
  const _fetchQuestionPaperContentById = async (paper_id) => {
    try {
      const papers = await getQuestionPaperContentById(paper_id);
      console.log("[QuizContextProvider]::[_fetchQuestionPaperContentById]::", papers);
      return papers;
    } catch (error) {
      console.error("[QuizContextProvider]::[_fetchQuestionPaperContentById]::err", error);
      return {};
    }
  }

  const _createQuestionPaper = async (question_paper) => {
    try {
      const payload = { question_paper: question_paper };
      console.log(`[QuizContextProvider]::[_createQuestionPaper]:: Enter ${payload}`);
      const data = await postQuestionPaper(payload);
      console.log("[QuizContextProvider]::[_createQuestionPaper]::", data);
      return data
    } catch (error) {
      console.error("[QuizContextProvider]::[_createQuestionPaper]::err", error);
      return {}
    }
  }

  return <QuizContext.Provider
    value={{ 
      fetchAllQuestionPapers: _fetchAllQuestionPapers,
      createQuestionPaper: _createQuestionPaper,
      fetchQuestionPaperContentById: _fetchQuestionPaperContentById,
    }}
  >{children}</QuizContext.Provider>
}

export const useQuizContext = () => {
  return useContext(QuizContext);
}