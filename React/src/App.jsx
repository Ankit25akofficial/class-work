import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    regNo: "",
    city: "",
    email: "",
    role: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Registration Form</h1>
      <p className="form-subtitle">Fill in your details below</p>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Age & Reg No — side by side */}
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="regNo">Reg. No</label>
            <input
              id="regNo"
              type="text"
              name="regNo"
              placeholder="Registration No."
              value={formData.regNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* City */}
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        {submitted && (
          <div className="submitted-data">
            <h2>✅ Submitted Data</h2>
            <table className="data-table">
              <tbody>
                <tr>
                  <td className="label-cell">Name</td>
                  <td>{formData.name}</td>
                </tr>
                <tr>
                  <td className="label-cell">Age</td>
                  <td>{formData.age}</td>
                </tr>
                <tr>
                  <td className="label-cell">Reg. No</td>
                  <td>{formData.regNo}</td>
                </tr>
                <tr>
                  <td className="label-cell">City</td>
                  <td>{formData.city}</td>
                </tr>
                <tr>
                  <td className="label-cell">Email</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td className="label-cell">Role</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {formData.role}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
