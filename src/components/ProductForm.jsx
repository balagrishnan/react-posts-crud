import { useEffect, useState } from "react"
import { useProducts } from '../hooks/useProducts'
import QuantityControl from '../components/QuantityControl'
const emptyForm = {
    productname: '',
    productdesc: '',
    productprice: '',
    productcategory: 'Select',
    quantity: 1
}

export default function ProductForm() {

    const { editingProduct, addProducts, saveProducts, cancelEdit } = useProducts()
    const [form, setForm] = useState(emptyForm)
    const isEditing = editingProduct !== null
    const [caption, setCaption] = useState("Add Product")

    useEffect(() => {
        if (editingProduct) {
            setCaption('Save Changes')
            setForm({
                productname: editingProduct.name,
                productdesc: editingProduct.description,
                productprice: editingProduct.price,
                productcategory: editingProduct.category,
                quantity: editingProduct.quantity
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
                quantity: form.quantity
            })
            setCaption('Add Product')
        } else {
            await addProducts({
                name: form.productname.trim(),
                description: form.productdesc.trim(),
                price: form.productprice.trim(),
                category: form.productcategory,
                quantity: form.quantity
            })
        }

        setForm(emptyForm)
    }

    const handleCancel = () => {
        cancelEdit()
        setForm(emptyForm)
        setCaption('Add Product')
    }

    const handleClear = () => {
        setForm(emptyForm)
        setCaption('Save Changes')
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
                    maxLength={100}
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
                <label htmlFor="quantity">Quantity (1 - 99)</label>
                <QuantityControl
                    id="quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={(val) => setForm(prev => ({ ...prev, quantity: val }))}
                />
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
                    <button type="submit" id="saveform" className="btn btn-primary">
                        {/* {isEditing ? 'Save Changes' : 'Add Post'} */}
                        {caption}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                    {/* <button type="button" className="btn btn-secondary" onClick={handleClear}>
                        Clear
                    </button> */}
                </div>
            </form>
        </section>
    )
}