import React from 'react'

const AddAssociate = () => {
    const [formData, setFormData] = useState({
        users: "",
        level: "",
        percent:"",
      })
    
      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [submitSuccess, setSubmitSuccess] = useState(false)
    

const levels = [
    0,1,2,3,4,5,6,7,8,9,10,11,12
]

        const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({
            ...prev,
            [name]: value,
            }))

            if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
            }
        }

 const validateForm = () => {
    const newErrors = {}

    if (!formData.users.trim()) {
      newErrors.users = "Users is required"
    } 

    if (!formData.percent.trim()) {
      newErrors.percent = "Percent is required"
    } 

    if (!formData.level) {
      newErrors.level = "Level is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!validateForm()) return
  
      setIsSubmitting(true)
  
      try {
        const payload = {
          ...formData,
        }
  
        const response = await postData("/marketplace/create", payload)
  
        console.log("Item created:", response)
        setSubmitSuccess(true)
  
        setFormData({
          users: "",
          level: "",
          percent:"",
        })
  
        setTimeout(() => setSubmitSuccess(false), 3000)
      } catch (error) {
        console.error("Error adding associate:", error)
        alert("Failed to add i. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  
    const handleReset = () => {
      setFormData({
        name: "",
        description: "",
        imageUrl: [],
        category: "",
        createdById: "",
      })
      setErrors({})
      setSubmitSuccess(false)
    }
  

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
            <label htmlFor="users" className="form-label">
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
            <label htmlFor="level" className="form-label">
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
            <label htmlFor="percent" className="form-label">
            Percent <span className="required">*</span>
            </label>
            <input
              type="number"
              id="percent"
              name="percent"
              value={formData.percent}
              onChange={handleInputChange}
              className={`form-input ${errors.percent ? "input-error" : ""}`}
              placeholder="Percentage"
            />
            {errors.percent && <span className="error-text">{errors.percent}</span>}
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
