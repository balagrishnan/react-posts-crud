import { useEffect, useState } from 'react'
import { usePosts } from '../hooks/usePosts'

const emptyForm = { title: '', body: '' }

export default function PostForm() {
  const { editingPost, addPost, savePost, cancelEdit } = usePosts()
  const [form, setForm] = useState(emptyForm)
  const isEditing = editingPost !== null

  useEffect(() => {
    if (editingPost) {
      setForm({ title: editingPost.title, body: editingPost.body })
    } else {
      setForm(emptyForm)
    }
  }, [editingPost])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.title.trim() || !form.body.trim()) {
      return
    }

    if (isEditing) {
      await savePost(editingPost.id, {
        title: form.title.trim(),
        body: form.body.trim(),
        userId: editingPost.userId,
      })
    } else {
      await addPost({
        title: form.title.trim(),
        body: form.body.trim(),
      })
    }

    setForm(emptyForm)
  }

  const handleCancel = () => {
    cancelEdit()
    setForm(emptyForm)
  }

  return (
    <section className="post-form-section">
      <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Enter post body"
          rows={4}
          required
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save Changes' : 'Add Post'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
