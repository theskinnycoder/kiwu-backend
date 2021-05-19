import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { v4 } from "uuid"

axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json;odata.metadata=full",
  "Content-Type": "application/json"
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return (await axios.get("https://cea-assignment.herokuapp.com/posts")).data
})

export const fetchPostByID = createAsyncThunk(
  "posts/fetchPostByID",
  async ({ id }) => {
    return (await axios.get(`https://cea-assignment.herokuapp.com/posts/${id}`))
      .data
  }
)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, body }) => {
    return (
      await axios.post("https://cea-assignment.herokuapp.com/posts", {
        id: v4(),
        title,
        body,
        liked: false,
        disliked: false
      })
    ).data
  }
)

export const editPostByID = createAsyncThunk(
  "posts/editPostByID",
  async ({ id, title, body }) => {
    return (
      await axios.patch(`https://cea-assignment.herokuapp.com/posts/${id}`, {
        title,
        body
      })
    ).data
  }
)

export const deletePostByID = createAsyncThunk(
  "posts/deletePostByID",
  async ({ id }) => {
    return (
      await axios.delete(`https://cea-assignment.herokuapp.com/posts/${id}`)
    ).data
  }
)

export const likePostByID = createAsyncThunk(
  "posts/likePost",
  async ({ id, liked }) => {
    return (
      await axios.patch(`https://cea-assignment.herokuapp.com/posts/${id}`, {
        liked: !liked,
        disliked: false
      })
    ).data
  }
)

export const dislikePostByID = createAsyncThunk(
  "posts/dislikePost",
  async ({ id, disliked }) => {
    return (
      await axios.patch(`https://cea-assignment.herokuapp.com/posts/${id}`, {
        disliked: !disliked,
        liked: false
      })
    ).data
  }
)
