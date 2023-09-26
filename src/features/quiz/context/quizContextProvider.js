import { useContext, createContext } from 'react';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {


  return <QuizContext.Provider
    value={{ name: 'Quiz' }}
  >{children}</QuizContext.Provider>
}

export const useQuizContext = () => {
  return useContext(QuizContext);
}