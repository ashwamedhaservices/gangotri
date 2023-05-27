import React, { createContext, useReducer } from 'react';
import {
  SET_ALL_COURSES,
  SET_SELECTED_COURSE,
  REMOVE_ALL_COURSES,
  REMOVE_SELECTED_COURSE,
} from './courseTypes'
import { courseReducer } from './courseReducer';
import { getCourse, storageSetItem } from '../../service/ash_admin';

const initialState = {
  courseList: [],
  selectedCourse: {},
};

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const setAllCourses = async () => {
    try {
      const res = await getCourse();
      console.log('[courseContextProvider]::[setAllCourses]:: response', res);
      if(res && res.length > 0) {
        dispatch(
          {
            type: SET_ALL_COURSES,
            payload: [...res]
          }
        )
      }
    } catch(err) {
      console.log('[courseContextProvider]::[setAllCourses]:: error', err);
    }
  }

  const setSelectedCourse = async (course) => {
    try {
      console.log('[courseContextProvider]::[setSelectedCourse]:: ', course);
      if(course) {
        dispatch({
          type: SET_SELECTED_COURSE,
          payload: {...course}
        })

        storageSetItem('selectedCourse', JSON.stringify({...course}));
      }
    } catch (err) {
      console.log('[courseContextProvider]::[setSelectedCourse]:: error', err);
    }
  }

  const removeAllCourse = async () => {
    dispatch(
      {
        type: REMOVE_ALL_COURSES,
      }
    )
  }

  const removeSelectedCourse = async () => {
    dispatch(
      {
        type: REMOVE_SELECTED_COURSE,
      }
    )
  }

  return <CourseContext.Provider
    value={{
      courseList: state.courseList,
      selectedCourse: state.selectedCourse,
      setAllCourses,
      setSelectedCourse,
      removeAllCourse,
      removeSelectedCourse
    }}
  >
    {children}
  </CourseContext.Provider>
}