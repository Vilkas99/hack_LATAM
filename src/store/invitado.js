import { createSlice } from "@reduxjs/toolkit";
// Slice
const slice = createSlice({
  name: "invitado",
  initialState: {
    keyId: null,
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
    addKey: (state, action) => {
      state.keyId = action.payload;
    },

    addMetaDatos: (state, action) => {
      state.metaDatos = action.payload;
    },
  },
});
export default slice.reducer;
// Actions
const { addKey, addMetaDatos } = slice.actions;
export const key = (miKey) => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(addKey(miKey));
  } catch (e) {
    return console.error(e.message);
  }
};

export const invitadoDatos = (data) => async (dispatch) => {
  try {
    return dispatch(addMetaDatos(data));
  } catch (e) {
    return console.error(e.message);
  }
};
