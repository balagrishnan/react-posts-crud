import { usePosts } from '../hooks/usePosts'

export default function PostItem({ post }) {
  const { startEdit, removePost } = usePosts()

  const handleDelete = () => {
    if (window.confirm(`Delete "${post.title}"?`)) {
      removePost(post.id)
    }
  }

  return (
    <article className="post-card">
      <div className="post-card-content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span className="post-meta">Post #{post.id} · User {post.userId}</span>
      </div>
      <div className="post-card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => startEdit(post)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  )
}
