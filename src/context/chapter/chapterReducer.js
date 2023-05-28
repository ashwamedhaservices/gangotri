import {
  SET_ALL_CHAPTERS,
  SET_SELECTED_CHAPTER,
  REMOVE_ALL_CHAPTERS,
  REMOVE_SELECTED_CHAPTER,
} from './chapterTypes'

export const chapterReducer = (state, action) => {
  switch(action.type) {
    case SET_ALL_CHAPTERS: 
      console.log('[chapterReducer]::[SET_ALL_CHAPTERS]', action)
      return {
        ...state,
        chapterList: [...action.payload]
      }
    case SET_SELECTED_CHAPTER: 
      console.log('[chapterReducer]::[SET_SELECTED_CHAPTER]', action)
      return {
        ...state,
        selectedChapter: {...action.payload}
      }
    case REMOVE_ALL_CHAPTERS: 
      console.log('[chapterReducer]::[REMOVE_ALL_CHAPTERS]', action)
      return {
        ...state,
        chapterList: []
      }
    case REMOVE_SELECTED_CHAPTER: 
      console.log('[chapterReducer]::[REMOVE_SELECTED_CHAPTER]', action)
      return {
        ...state,
        selectedChapter: {}
      }
    default: 
      return state
  }
}