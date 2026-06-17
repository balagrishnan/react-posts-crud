import React, { useState } from 'react';
//import './QuantityControl.css';

const QuantityControl = ({ min = 1, max = 99, initialValue = 1, onChange }) => {
    const [quantity, setQuantity] = useState(initialValue);

    const handleIncrement = () => {
        if (quantity < max) {
            const newValue = quantity + 1;
            setQuantity(newValue);
            if (onChange) onChange(newValue);
        }
    };

    const handleDecrement = () => {
        if (quantity > min) {
            const newValue = quantity - 1;
            setQuantity(newValue);
            if (onChange) onChange(newValue);
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);

        // If the input is empty or NaN, let the user type, but fall back gracefully
        if (isNaN(value)) {
            setQuantity('');
            return;
        }

        // Clamp the value between min and max
        const clampedValue = Math.max(min, Math.min(max, value));
        setQuantity(clampedValue);
        if (onChange) onChange(clampedValue);
    };

    const handleBlur = () => {
        // If the user leaves the input blank, reset it to the minimum value
        if (quantity === '') {
            setQuantity(min);
            if (onChange) onChange(min);
        }
    };

    return (
        <div className="quantity-wrapper">
            <button
                type="button"
                className="quantity-btn decrement"
                onClick={handleDecrement}
                disabled={quantity <= min}
                aria-label="Decrease quantity"
            >
                &minus;
            </button>

            <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={min}
                max={max}
            />
            <button
                type="button"
                className="quantity-btn increment"
                onClick={handleIncrement}
                disabled={quantity >= max}
                aria-label="Increase quantity"
            >
                &#43;
            </button>
        </div>
    );
};

export default QuantityControl;