import { useState } from "react";
import "./Signup.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { postData } from "../../utils/api";
import { useContext } from "react"
import { myContext } from "../../App"

const Signup = () => {
  const context = useContext(myContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/users/create-user", formData); // use register not create-user

      // Save token to localStorage
      localStorage.setItem("token", response.token?.accessToken || "");  // safe fallback
      localStorage.setItem("user", JSON.stringify(response.user || {}));

      context.setAlertBox({
        open: true,
        msg: "SignUp successfully!",
        error: false,
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Signup failed:", error);
      context.setAlertBox({
      open: true,
      msg: "SignUp Failed!",
      error: true,
    });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card login-card-centered">
        <div className="login-image-section">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*H0blMkNrtDWvZdrohrivKQ.jpeg"
            alt="Login Illustration"
            className="login-illustration"
          />
          <a href="/login" className="create-account-link">Already have an account?</a>
        </div>
        <div className="login-form-section">
          <img src="/SPC.png" alt="SPC Logo" className="login-logo" />
          <h2 className="login-title">Sign Up</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon"><FaUser /></span>
              <input
                type="text"
                name="name"
                placeholder=" Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><MdEmail /></span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><FaPhoneAlt /></span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><FaCircleUser /></span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SELLER">Seller</option>
                <option value="ASSOCIATE">Associate</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
