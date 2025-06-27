import React from 'react'

const AddAssociate = () => {
  return (
    <>
     <div className="add-item-container">
      <div className="add-item-header">
        <h1 className="add-item-title">Add Associate</h1>
        <p className="add-item-subtitle">Fill form to add associate</p>
      </div>

      {submitSuccess && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Item added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-grid">

          {/* User Field */}
          <div className="input-group1">
            <label htmlFor="category" className="form-label">
              Users <span className="required">*</span>
            </label>
            <select
              id="users"
              name="users"
              value={formData.users}
              onChange={handleInputChange}
              className={`form-select ${errors.users ? "input-error" : ""}`}
            >
             <option value="">Select a User</option>
                {users.map((user) => (
                <option key={user._id} value={user._id}>
                    {user.role === "user" ? user.name : "no user"}
                </option>
                ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

           {/* Level Field */}
          <div className="input-group1">
            <label htmlFor="category" className="form-label">
              Level <span className="required">*</span>
            </label>
            <select
              id="level"
              name="users"
              value={formData.users}
              onChange={handleInputChange}
              className={`form-select ${errors.users ? "input-error" : ""}`}
            >
             <option value="">Select a User</option>
                {users.map((user) => (
                <option key={user._id} value={user._id}>
                    {user.role === "user" ? user.name : "no user"}
                </option>
                ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
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
