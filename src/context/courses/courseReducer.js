import {
  SET_ALL_COURSES,
  SET_SELECTED_COURSE,
  REMOVE_ALL_COURSES,
  REMOVE_SELECTED_COURSE,
} from './courseTypes'

export const courseReducer = (state, action) => {
  switch(action.type) {
    case SET_ALL_COURSES: 
      console.log('[courseReducer]::[SET_ALL_COURSE]', action)
      return {
        ...state,
        courseList: [...action.payload]
      }
    case SET_SELECTED_COURSE: 
      console.log('[courseReducer]::[SET_SELECTED_COURSE]', action)
      return {
        ...state,
        selectedCourse: {...action.payload}
      }
    case REMOVE_ALL_COURSES: 
      console.log('[courseReducer]::[REMOVE_ALL_COURSES]', action)
      return {
        ...state,
        courseList: []
      }
    case REMOVE_SELECTED_COURSE: 
      console.log('[courseReducer]::[REMOVE_SELECTED_COURSE]', action)
      return {
        ...state,
        selectedCourse: {}
      }
    default: 
      return state
  }
}