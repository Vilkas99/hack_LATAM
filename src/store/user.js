import { createSlice } from "@reduxjs/toolkit";
// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
    metaDatos: {
      email: "prueba@gmail.com",
      level: 0,
      name: "Prueba",
      points: 0,
      quest: [],
      completadas: 0,
      type: "STUDENT",
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },

    addMetaDatos: (state, action) => {
      state.metaDatos = action.payload;
    },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess, addMetaDatos } = slice.actions;
export const ingresar = ({ username, password }) => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({ username }));
  } catch (e) {
    return console.error(e.message);
  }
};

export const metaDatos = (data) => async (dispatch) => {
  try {
    return dispatch(addMetaDatos(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
