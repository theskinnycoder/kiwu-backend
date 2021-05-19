import { createSlice } from "@reduxjs/toolkit"
import { login, logout, register } from "./authThunks.js"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    register_loading: false,
    register_error: "",
    login_loading: false,
    login_error: "",
    logout_loading: false,
    logout_error: ""
  },
  extraReducers: {
    // REGISTER
    [register.pending]: (state, _) => {
      state.register_loading = true
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.register_loading = false
    },
    [register.rejected]: (state, { payload }) => {
      state.register_error = payload
      state.register_loading = false
    },

    // LOGIN
    [login.pending]: (state, _) => {
      state.login_loading = true
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.login_loading = false
    },
    [login.rejected]: (state, { payload }) => {
      state.login_error = payload
      state.login_loading = false
    },

    // LOGOUT
    [logout.pending]: (state, _) => {
      state.logout_loading = true
    },
    [logout.fulfilled]: (state, _) => {
      state.user = null
      state.logout_loading = false
    },
    [logout.rejected]: (state, { payload }) => {
      state.logout_error = payload
      state.logout_loading = false
    }
  }
})

export default authSlice.reducer
