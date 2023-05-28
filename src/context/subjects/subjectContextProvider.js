import React, { createContext, useReducer } from 'react';
import { 
  SET_ALL_SUBJECTS, 
  SET_SELECTED_SUBJECT,
  REMOVE_ALL_SUBJECTS, 
  REMOVE_SELECTED_SUBJECT, 
} from './subjectTypes';
import { subjectReducer } from './subjectReducer';
import { getCourse, storageSetItem } from '../../service/ash_admin';

const initialState = {
  subjectList: [],
  selectedSubject: {},
};

export const SubjectContext = createContext();

export const SubjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectReducer, initialState);

  const setAllSubjects = async () => {
    // try {
    //   const res = await getCourse();
    //   console.log('[SubjectContextProvider]::[setAllSubjects]:: response', res);
    //   if(res && res.length > 0) {
    //     dispatch(
    //       {
    //         type: SET_ALL_SUBJECTS,
    //         payload: [...res]
    //       }
    //     )
    //   }
    // } catch(err) {
    //   console.log('[SubjectContextProvider]::[setAllSubjects]:: error', err);
    // }
  }

  const setSelectedSubject = async (subject) => {
    try {
      console.log('[SubjectContextProvider]::[setSelectedSubject]:: ', subject);
      if(subject) {
        dispatch({
          type: SET_SELECTED_SUBJECT,
          payload: {...subject}
        })

        storageSetItem('selectedSubject', JSON.stringify({...subject}));
      }
    } catch (err) {
      console.log('[SubjectContextProvider]::[setSelectedSubject]:: error', err);
    }
  }

  const removeAllSubject = async () => {
    dispatch(
      {
        type: REMOVE_ALL_SUBJECTS,
      }
    )
  }

  const removeSelectedSubject = async () => {
    dispatch(
      {
        type: REMOVE_SELECTED_SUBJECT,
      }
    )
  }

  return <SubjectContext.Provider
    value={{
      subjectList: state.subjectList,
      selectedSubject: state.selectedSubject,
      setAllSubjects,
      setSelectedSubject,
      removeAllSubject,
      removeSelectedSubject
    }}
  >
    {children}
  </SubjectContext.Provider>
}