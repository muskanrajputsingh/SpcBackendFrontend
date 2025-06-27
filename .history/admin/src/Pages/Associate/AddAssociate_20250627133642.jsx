import React from 'react'

const AddAssociate = () => {
  return (
    <>
     <div className="add-item-container">
      <div className="add-item-header">
        <h1 className="add-item-title">Add Associate</h1>
        <p className="add-item-subtitle">Fill in the information below</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Item added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-grid">
          {/* Name Field */}
          <div className="input-group1">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Enter item name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Category Field */}
          <div className="input-group1">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`form-select ${errors.category ? "input-error" : ""}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Product Images */}
          <div className="form-section">
            <h3 className="section-title">Product Images</h3>
            <div className="input-with-add">
              <input
                type="url"
                name="image"
                value={tempInputs.image}
                onChange={handleTempInputChange}
                placeholder="Enter image URL"
                className="form-input"
              />
              <button type="button" onClick={addImage} className="add-btn">
                Add
              </button>
            </div>

            {formData.imageUrl.length > 0 && (
              <div className="preview-container">
                <h4 className="preview-title">Image Preview</h4>
                <div className="preview-grid">
                  {formData.imageUrl.map((image, index) => (
                    <div key={index} className="preview-item image-preview">
                      <button
                        type="button"
                        className="delete-preview-btn"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        ×
                      </button>
                      <img src={image || "/placeholder.svg"} alt={`Product ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="input-group-full">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? "input-error" : ""}`}
              placeholder="Enter detailed description of the item"
              rows="4"
            />
            <div className="char-count">{formData.description.length} characters</div>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleReset} className="reset-button" disabled={isSubmitting}>
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "submit-button-disabled" : ""}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default AddAssociate
