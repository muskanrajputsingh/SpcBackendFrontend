import React from 'react'

const AddAssociate = () => {

const levels = [
    0,1,2,3,4,5,6,7,8,9,10,11,12
]

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
                <option key={user._id} value={user.name}>
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
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className={`form-select ${errors.level ? "input-error" : ""}`}
            >
             <option value="">Select Level</option>
                {levels.map((level) => (
                <option key={level} value={level}>
                   {level}
                </option>
                ))}
            </select>
            {errors.level && <span className="error-text">{errors.level}</span>}
          </div>

         <div className="input-group1">
            <label htmlFor="perce" className="form-label">
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
