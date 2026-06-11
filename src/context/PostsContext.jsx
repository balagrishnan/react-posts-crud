import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import * as postApi from '../services/postApi'
import { initialState, postsReducer } from '../reducers/postsReducer'

export const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  const loadPosts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    try {
      const posts = await postApi.getPosts()
      dispatch({ type: 'FETCH_SUCCESS', payload: posts })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to load posts',
      })
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const addPost = useCallback(async (formData) => {
    try {
      const newPost = await postApi.createPost(formData)
      dispatch({ type: 'ADD_POST', payload: newPost })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to create post',
      })
    }
  }, [])

  const savePost = useCallback(async (id, formData) => {
    try {
      const updatedPost = await postApi.updatePost(id, {
        ...formData,
        id,
      })
      dispatch({ type: 'UPDATE_POST', payload: updatedPost })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to update post',
      })
    }
  }, [])

  const removePost = useCallback(async (id) => {
    try {
      await postApi.deletePost(id)
      dispatch({ type: 'DELETE_POST', payload: id })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to delete post',
      })
    }
  }, [])

  const startEdit = useCallback((post) => {
    dispatch({ type: 'SET_EDITING_POST', payload: post })
  }, [])

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CLEAR_EDITING_POST' })
  }, [])

  const value = useMemo(
    () => ({
      posts: state.posts,
      loading: state.loading,
      error: state.error,
      editingPost: state.editingPost,
      loadPosts,
      addPost,
      savePost,
      removePost,
      startEdit,
      cancelEdit,
    }),
    [state, loadPosts, addPost, savePost, removePost, startEdit, cancelEdit],
  )

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}
