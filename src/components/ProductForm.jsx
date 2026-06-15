import { useEffect, useState } from "react"
import { useProducts } from '../hooks/useProducts'

const emptyForm = {
    productname: '',
    productdesc: '',
    productprice: '',
    productcategory: 'Select',
    productquantity: 0
}

export default function ProductForm() {

    const { editingProduct, addProducts, saveProducts, cancelEdit } = useProducts()
    const [form, setForm] = useState(emptyForm)
    const isEditing = editingProduct !== null

    useEffect(() => {
        if (editingProduct) {
            setForm({
                productname: editingProduct.name,
                productdesc: editingProduct.description,
                productprice: editingProduct.price,
                productcategory: editingProduct.category,
                productquantity: editingProduct.quantity
            })
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
                id: editingProduct.id,
                category: form.productcategory,
                quantity: form.productquantity
            })
        } else {
            await addProducts({
                name: form.productname.trim(),
                description: form.productdesc.trim(),
                price: form.productprice.trim(),
                category: form.productcategory,
                quantity: form.productquantity
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
            <h2>{isEditing ? 'Edit Product' : 'Create Product'}</h2>
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
                <label htmlFor="productprice">Price ($)</label>
                <input
                    id="productprice"
                    name="productprice"
                    type="text" value={form.productprice}
                    onChange={handleChange}
                    placeholder="Enter Product Price"
                    required
                />
                <label htmlFor="productquantity">Quantity</label>
                <input
                    id="productquantity"
                    name="productquantity"
                    text="number"
                    value={form.productquantity}
                    onChange={handleChange}
                    placeholder="Enter Quantity"
                    required>

                </input>
                <label htmlFor="productcategory">Category</label>
                <input
                    id="productcategory"
                    name="productcategory"
                    text="text"
                    value={form.productcategory}
                    onChange={handleChange}
                    placeholder="Enter Category"
                    required>

                </input>
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