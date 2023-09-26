import { useContext, createContext } from 'react';
import { getMeetings, postMeetings } from '../../../service/ash_admin';

const MeetingContext = createContext();

export const MeetingContextProvider = ({ children }) => {

  const _createMeeting = async (meetings) => {
    try {
      const payload = { meetings: meetings };
      console.log(`[MeetingContextProvider]::[_createMeeting]:: Enter ${payload}`);
      const data = await postMeetings(payload);
      console.log("[MeetingContextProvider]::[_createMeeting]::", data);
      return data
    } catch (error) {
      console.error("[MeetingContextProvider]::[_createMeeting]::err", error);
      return {}
    }
  };

  const _fetchMeetingsData = async () => {
    try {
      const meetings = await getMeetings();
      console.log("[MeetingContextProvider]::[_fetchMeetingsData]::", meetings);
      return meetings;
    } catch (error) {
      console.error("[MeetingContextProvider]::[_fetchMeetingsData]::err", error);
      return {};
    }
  };

  return <MeetingContext.Provider value={{
        fetchMeetingsData: _fetchMeetingsData,
        createMeeting: _createMeeting,
      }}
    >{children}</MeetingContext.Provider>
}

export const useMeetingContext = () => {
  return useContext(MeetingContext);
}