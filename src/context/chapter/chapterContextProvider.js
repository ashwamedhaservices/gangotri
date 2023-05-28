import React, { createContext, useReducer } from 'react';
import { 
  SET_ALL_CHAPTERS, 
  SET_SELECTED_CHAPTER,
  REMOVE_ALL_CHAPTERS, 
  REMOVE_SELECTED_CHAPTER, 
} from './chapterTypes';
import { chapterReducer } from './chapterReducer';
import { storageSetItem } from '../../service/ash_admin';

const initialState = {
  chapterList: [],
  selectedChapter: {},
};

export const ChapterContext = createContext();

export const ChapterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chapterReducer, initialState);

  const setAllChapters = async () => {
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

  const setSelectedChapter = async (chapter) => {
    try {
      console.log('[ChapterContextProvider]::[setSelectedChapter]:: ', chapter);
      if(chapter) {
        dispatch({
          type: SET_SELECTED_CHAPTER,
          payload: {...chapter}
        })

        storageSetItem('selectedChapter', JSON.stringify({...chapter}));
      }
    } catch (err) {
      console.log('[ChapterContextProvider]::[setSelectedChapter]:: error', err);
    }
  }

  const removeAllChapter = async () => {
    dispatch(
      {
        type: REMOVE_ALL_CHAPTERS,
      }
    )
  }

  const removeSelectedChapter = async () => {
    dispatch(
      {
        type: REMOVE_SELECTED_CHAPTER,
      }
    )
  }

  return <ChapterContext.Provider
    value={{
      chapterList: state.chapterList,
      selectedChapter: state.selectedChapter,
      setAllChapters,
      setSelectedChapter,
      removeAllChapter,
      removeSelectedChapter,
    }}
  >
    {children}
  </ChapterContext.Provider>
}