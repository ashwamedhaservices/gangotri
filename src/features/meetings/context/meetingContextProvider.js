import { useContext, createContext } from 'react';

const MeetingContext = createContext();

export const MeetingContextProvider = ({ children }) => {


  return <MeetingContext.Provider>{children}</MeetingContext.Provider>
}

export const useMeetingContext = () => {
  return useContext(MeetingContext);
}