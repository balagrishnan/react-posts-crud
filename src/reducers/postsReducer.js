export const initialState = {
  posts: [],
  loading: false,
  error: null,
  editingPost: null,
}

export function postsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: null }

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        editingPost: null,
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }

    case 'SET_EDITING_POST':
      return { ...state, editingPost: action.payload }

    case 'CLEAR_EDITING_POST':
      return { ...state, editingPost: null }

    default:
      return state
  }
}
