import { postDataAPI } from "../../utils/fetchData"
import axios from 'axios'

export const TYPES = {
  AUTH: 'AUTH'
}


export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post('/api/login', data);

    if (res.status === 200 && res.data.user && res.data.access_token) {
      const { user, access_token, refresh_token } = res.data;
      dispatch({
        type: "AUTH",
        payload: {
          token: access_token,
          user: user,
        },
      });
      
      localStorage.setItem('firstLogin', true);
      localStorage.setItem('user', JSON.stringify(user));  
      localStorage.setItem('refreshToken', refresh_token); 
    }
    else throw new Error('Login was not successful');
  } catch (err) {
    dispatch({
      type: "NOTIFY",
      payload: {
        error: err.response.data.msg || err.message,
      },
    });
    throw err;  // Important. This allows the calling function to know that login failed.
  }
};

export const logout = () => async (dispatch) => {
  const res = await postDataAPI('logout');
  console.log('logout response: ', res); 

  dispatch({
    type: "AUTH",
    payload: {
      token: null,
      user: null,
    },
  });

  localStorage.removeItem('firstLogin');
  localStorage.removeItem('refreshToken'); // Remove the refresh token

  dispatch({
    type: "NOTIFY",
    payload: {
      success: res.data.msg
    },
  });
};

export const register = (data) => async (dispatch) => {
  dispatch({ type: 'NOTIFY', payload: { loading: true } });
  
  const endpoint = data.role === 'medicalStoreWorker' ? 'register-medical-worker' : 'register';

  try {
    const res = await postDataAPI(`api/${endpoint}`, data);
      console.log('register response: ', res);
      console.log('register data: ', data);
    if (res.status >= 200 && res.status < 300) {
      dispatch({
        type: "AUTH",
        payload: {
          token: res.data.access_token,
          user: res.data.user
        }
      });

      localStorage.setItem('firstLogin', true);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('refreshToken', res.data.refresh_token); // Store the refresh token

      dispatch({
        type: "NOTIFY",
        payload: {
          success: res.data.msg
        }
      });

      return { success: true };

    } else {
      dispatch({
        type: 'NOTIFY',
        payload: {
          error: res.data.msg
        }
      });

      return { success: false };
    }

  } catch (error) { 
      dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'An unexpected error occurred. Please try again.'
      }});

      return { success: false };
  }
}

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');

  if (firstLogin) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) throw new Error('Refresh token not found in local storage');

      const res = await axios.post(`/api/refresh_token`, {}, {
        headers: {
          "x-refresh-token": refreshToken
        }
      });

      const { access_token, refresh_token } = res.data;

      localStorage.setItem('refreshToken', refresh_token); 
      const user = JSON.parse(localStorage.getItem('user'));

      dispatch({
        type: "AUTH",
        payload: {
          token: access_token,
          user: user,
        },
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: 'NOTIFY', payload: { error: err.message } });
    }
  }
}; 