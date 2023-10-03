import { useContext, createContext } from 'react';
import { getAllQuestionPapers, getQuestionById, getQuestionPaperContentById, postQuestionAndAnswersToPaper, postQuestionPaper, putQuestionById } from '../../../service/ash_admin';

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

  const _addQuestionAndAnswersToPaper = async (paper_id, question_paper) => {
    try {
      const payload = { question_paper: question_paper };
      console.log(`[QuizContextProvider]::[_addQuestionAndAnswersToPaper]:: Enter ${payload}`);
      const data = await postQuestionAndAnswersToPaper(paper_id, payload);
      console.log("[QuizContextProvider]::[_addQuestionAndAnswersToPaper]::", data);
      return data
    } catch (error) {
      console.error("[QuizContextProvider]::[_addQuestionAndAnswersToPaper]::err", error);
      return {}
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

  const _fetchQuestionById = async (question_id) => {
    try {
      const question = await getQuestionById(question_id);
      console.log("[QuizContextProvider]::[_fetchQuestionById]::", question);
      return question;
    } catch (error) {
      console.error("[QuizContextProvider]::[_fetchQuestionById]::err", error);
      return {};
    }
  }

  const _updateQuestionById = async (question, question_id) => {
    try {
      const payload = { ...question };
      console.log(`[QuizContextProvider]::[_updateQuestionById]:: Enter ${payload}`);
      const data = await putQuestionById(payload, question_id);
      console.log("[QuizContextProvider]::[_updateQuestionById]::", data);
      return data
    } catch (error) {
      console.error("[QuizContextProvider]::[_updateQuestionById]::err", error);
      return {}
    }
  }

  const _fetchAnswerById = async (answer_id) => {
    try {
      const answer = await getQuestionById(answer_id);
      console.log("[QuizContextProvider]::[_fetchAnswerById]::", answer);
      return answer;
    } catch (error) {
      console.error("[QuizContextProvider]::[_fetchAnswerById]::err", error);
      return {};
    }
  }

  const _updateAnswerById = async (answer, answer_id) => {
    try {
      const payload = { ...answer };
      console.log(`[QuizContextProvider]::[_updateAnswerById]:: Enter ${payload}`);
      const data = await putQuestionById(payload, answer_id);
      console.log("[QuizContextProvider]::[_updateAnswerById]::", data);
      return data
    } catch (error) {
      console.error("[QuizContextProvider]::[_updateAnswerById]::err", error);
      return {}
    }
  }

  return <QuizContext.Provider
    value={{ 
      fetchAllQuestionPapers: _fetchAllQuestionPapers,
      createQuestionPaper: _createQuestionPaper,
      fetchQuestionPaperContentById: _fetchQuestionPaperContentById,
      addQuestionAndAnswersToPaper: _addQuestionAndAnswersToPaper,
      fetchQuestionById: _fetchQuestionById,
      updateQuestionById: _updateQuestionById,
      fetchAnswerById: _fetchAnswerById,
      updateAnswerById: _updateAnswerById,
    }}
  >{children}</QuizContext.Provider>
}

export const useQuizContext = () => {
  return useContext(QuizContext);
}