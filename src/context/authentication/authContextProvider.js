import React, { createContext, useReducer } from 'react'
import { SIGN_IN_USER, SIGN_OUT_USER } from './authTypes'
import { reducer } from './authReducer'
import { useNavigate } from 'react-router-dom';
import mockData from '../../_mock/admin.json';
import { postLogin, storageClear, storageGetItem } from '../../service/ash_admin';
const initialState = {
  isSignedIn: false,
  user: null
}

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate();
  
  const loginUser = async ({ mobile_number, email, username, password }) => {
    const user = mockData.users.find((user) => ((user.username=== username || user.email === email) && user.password === password));
    console.log(user);

    const response = await postLogin({
      users: {
        mobile_number,
        password
      }
    })
    if(response) {
      dispatch(
        {
        type: SIGN_IN_USER, 
        payload: {
          username: JSON.parse(storageGetItem('users')).full_name,
          password
        }
      })
      navigate('/dashboard', { replace: true });
    }
    // if(user) {
    //   dispatch(
    //     {
    //     type: SIGN_IN_USER, 
    //     payload: {
    //       email,
    //       username,
    //       password
    //     }
    //   })
    //   navigate('/dashboard', { replace: true });
    // } 
    else {
      // User is logged out
      storageClear();
      dispatch({type: SIGN_OUT_USER})
    }
  }
  const logoutUser = () => {
    storageClear();
    dispatch({type: SIGN_OUT_USER})
  }
  return <AuthContext.Provider 
            value={{
              isSignedIn: state.isSignedIn,
              user: state.user,
              login: loginUser,
              logout: logoutUser,
            }}>{props.children}</AuthContext.Provider>
}