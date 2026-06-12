import { useEffect, useState } from "react"
import { useProducts } from '../hooks/useProducts'

const emptyForm = { productname: '', productdesc: '', productprice: '' }

export default function ProductForm() {

    const { editingProduct, addProducts, saveProducts, cancelEdit } = useProducts()
    const [form, setForm] = useState(emptyForm)
    const isEditing = editingProduct !== null

    useEffect(() => {
        if (editingProduct) {
            setForm({ productname: editingProduct.name, productdesc: editingProduct.description, productprice: editingProduct.price })
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

        if (!form.productname.trim() || !form.productdesc.trim() || !form.productprice) {
            return
        }

        if (isEditing) {
            await saveProducts(editingProduct.id, {
                name: form.productname.trim(),
                description: form.productdesc.trim(),
                price: form.productprice,
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
            <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
            <form className="post-form" onSubmit={handleSubmit}>
                <label htmlFor="productname">Name</label>
                <input
                    id="productname"
                    name="productname"
                    type="text" value={form.productname}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    required
                />
                <label htmlFor="productdesc">Description</label>
                <input
                    id="productdesc"
                    name="productdesc"
                    type="text" value={form.productdesc}
                    onChange={handleChange}
                    placeholder="Enter Product Description"
                    required
                />
                <label htmlFor="productprice">Price</label>
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
                        {isEditing ? 'Save Changes' : 'Add Post'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
}