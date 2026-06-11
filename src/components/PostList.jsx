import { usePosts } from '../hooks/usePosts'
import PostItem from './PostItem'

export default function PostList() {
  const { posts, loading, error } = usePosts()

  if (loading) {
    return <div className="status-message">Loading posts...</div>
  }

  if (error) {
    return <div className="status-message error">Error: {error}</div>
  }

  if (posts.length === 0) {
    return <div className="status-message">No posts yet. Create one above!</div>
  }

  return (
    <section className="post-list">
      <h2>All Posts ({posts.length})</h2>
      <div className="post-grid">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
