import axios from "../../utils/axiosHelper.js"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }) =>
    (
      await axios.post(
        "/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      )
    ).data
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) =>
    (
      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
    ).data
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () =>
    (await axios.post("/api/auth/logout", {}, { withCredentials: true })).data
)
