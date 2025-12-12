import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createEmployer } from "../api";
import { validateEmployerForm, validateEmployerProfileForm } from "../utils/validateStudent";
import { useNavigate } from "react-router-dom";

export default function SignEmp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const full_name = form.namemployer.value.trim();
    const email = form.emailemployer.value.trim();
    const password = form.passemployer.value.trim();
    const company = form.univemp.value.trim();
    const city = form.cityemp.value;

    // Validation
    const messages = validateEmployerForm({ full_name, email, password, company, city });
    if (messages.length > 0) {
      setError(messages.join("\n"));
      return;
    }

    try {
      const res = await createEmployer({ full_name, email, password, company, city });

      localStorage.setItem("role", "employer");
      localStorage.setItem("employerId", res.data.id);

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/empdash1"), 1000);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join("\n"));
      } else {
        setError(err.response?.data?.message || "Error creating account");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="mainlogin">
        <img src="/media/add-user.png" alt="login" style={{ width: "50px", marginBottom: "5px" }} />
        <p className="endform" style={{ color: "rgb(20, 20, 26)" }}>Create Account</p>
        <p className="endform" style={{ color: "gray" }}>Join Khedma4Students and start your journey</p>

        <div className="empstu">
          <a className="al choose" href="/sign"><b>Student</b></a>
          <a className="al actform" href="/signemp"><b>Employer</b></a>
        </div>

        <section className="loginform">
          <form id="employerSignUpForm" onSubmit={handleSubmit}>
            <label htmlFor="namemployer">Full Name</label>
            <input className="inputlog" type="text" id="namemployer" name="namemployer" placeholder="Kawtar Benabdelmoumene" />

            <label htmlFor="emailemployer">Email</label>
            <input className="inputlog" type="text" id="emailemployer" name="emailemployer" placeholder="example@gmail.com" />

            <label htmlFor="passemployer">Password</label>
            <input className="inputlog" type="password" id="passemployer" name="passemployer" />

            <label htmlFor="univemp">Company/Organization</label>
            <input className="inputlog" type="text" id="univemp" name="univemp" placeholder="University of Algiers" />

            <label htmlFor="cityemp">City</label>
            <select className="inputlog" id="cityemp" name="cityemp">
              <option value="">-- Select your city --</option>
              <option value="algiers">Algiers</option>
              <option value="oran">Oran</option>
              <option value="constantine">Constantine</option>
            </select>

            {error && <small className="error" style={{ whiteSpace: "pre-wrap" }}>{error}</small>}
            {success && <small className="success">{success}</small>}

            <button type="submit" className="btnlog"><b>Create Employer Account</b></button>
          </form>

          <p className="endform">
            Already have an account? <a className="endform" href="/emplogin" style={{ color: "blue", textDecoration: "none" }}><b>Login</b></a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
