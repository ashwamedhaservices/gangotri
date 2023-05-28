import {
  SET_ALL_SUBJECTS,
  SET_SELECTED_SUBJECT,
  REMOVE_ALL_SUBJECTS,
  REMOVE_SELECTED_SUBJECT,
} from './subjectTypes'

export const subjectReducer = (state, action) => {
  switch(action.type) {
    case SET_ALL_SUBJECTS: 
      console.log('[subjectReducer]::[SET_ALL_SUBJECTS]', action)
      return {
        ...state,
        subjectList: [...action.payload]
      }
    case SET_SELECTED_SUBJECT: 
      console.log('[subjectReducer]::[SET_SELECTED_SUBJECT]', action)
      return {
        ...state,
        selectedSubject: {...action.payload}
      }
    case REMOVE_ALL_SUBJECTS: 
      console.log('[subjectReducer]::[REMOVE_ALL_SUBJECTS]', action)
      return {
        ...state,
        subjectList: []
      }
    case REMOVE_SELECTED_SUBJECT: 
      console.log('[subjectReducer]::[REMOVE_SELECTED_SUBJECT]', action)
      return {
        ...state,
        selectedSubject: {}
      }
    default: 
      return state
  }
}