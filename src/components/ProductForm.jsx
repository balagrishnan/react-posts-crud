import { useEffect, useState } from "react"
import { useProducts } from '../hooks/useProducts'

const emptyForm = { productname: '', productdesc: '', productprice: '' }

export default function ProductForm() {

    const { editingProduct, addProducts, saveProduct, cancelEdit } = useProducts()
    const [form, setForm] = useState(emptyForm)
    const isEditing = editingProduct !== null
    console.log(isEditing)

    useEffect(() => {
        if (editingProduct) {
            setForm({ name: editingProduct.name, description: editingProduct.description, price: editingProduct.price })
        } else {
            setForm(emptyForm)
        }
    }, [editingProduct])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!form.productname.trim() || !form.productdesc.trim() || !form.productprice.trim()) {
            return
        }

        if (isEditing) {
            await saveProduct(editingProduct.id, {
                name: form.productname.trim(),
                description: form.productdesc.trim(),
                price: form.productprice.trim(),
                id: editingProduct.id
            })
        } else {
            await addProducts({
                name: form.productname.trim(),
                description: form.productdesc.trim(),
                price: form.productprice.trim(),
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
            <h2>Create Post</h2>
            <form className="post-form" onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input
                    id="productname"
                    name="productname"
                    type="text" value={form.productname}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    required
                />
                <label htmlFor="Description">Description</label>
                <input
                    id="productdesc"
                    name="productdesc"
                    type="text" value={form.productdesc}
                    onChange={handleChange}
                    placeholder="Enter Product Description"
                    required
                />
                <label htmlFor="Price">Price</label>
                <input
                    id="productprice"
                    name="productprice"
                    type="text" value={form.productprice}
                    onChange={handleChange}
                    placeholder="Enter Product Price"
                    required
                />

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Add Post
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
}