import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createStudent } from "../api";
import { validateStudentForm } from "../utils/validateStudent";

export default function Sign() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const full_name = form.full_name?.value.trim();
    const email = form.email?.value.trim();
    const password = form.password?.value.trim();
    const university = form.university?.value.trim();
    const city = form.city?.value;

    const messages = validateStudentForm({ full_name, email, password, university, city });

    if (messages.length > 0) {
      setError(messages.join("\n"));
      return;
    }

   try {
  const res = await createStudent({ full_name, email, password, university, city });

  
  localStorage.setItem("role", "student");
  localStorage.setItem("studentId", res.data.id); 

  setSuccess("Account created successfully!");
  setTimeout(() => { window.location.href = "/Welcome"; }, 1000);
} catch (err) {


      if (err.response?.data?.errors) {
        const backendErrors = Object.values(err.response.data.errors).flat().join("\n");
        setError(backendErrors);
      } else {
        setError(err.response?.data?.message || "Error creating account");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="mainlogin">
        <img src="/media/add-user.png" alt="login" style={{ width: 50 }} />
        <p className="endform" style={{ color: "rgb(20,20,26)" }}>Create Account</p>
        <p className="endform" style={{ color: "gray" }}>Join Khedma4Students and start your journey</p>
        <div className="empstu">
          <a className="al actform" href="/sign"><b>Student</b></a>
          <a className="al choose" href="/signemp"><b>Employer</b></a>
        </div>
        <section className="loginform">
          <form id="studentSignUpForm" onSubmit={handleSubmit}>
            <p><b>Student Sign Up</b></p><br />
            <label>Full Name</label>
            <input className="inputlog" type="text" name="full_name" placeholder="Kawtar Benabdelmoumene" />
            <label>Email</label>
            <input className="inputlog" type="email" name="email" placeholder="example@gmail.com" />
            <label>Password</label>
            <input className="inputlog" type="password" name="password" />
            <label>University/School</label>
            <input className="inputlog" type="text" name="university" placeholder="University of Algiers" />
            <label>City</label>
            <select className="inputlog" name="city">
              <option value="">-- Select your city --</option>
              <option value="algiers">Algiers</option>
              <option value="oran">Oran</option>
              <option value="blida">Blida</option>
            </select>
            {error && <small className="error" style={{ whiteSpace: "pre-wrap" }}>{error}</small>}
            {success && <small className="success">{success}</small>}
            <br /><br />
            <button className="btnlog"><b>Create Student Account</b></button>
          </form>
          <p className="endform">Already have an account? <a href="/login" style={{ color: "blue" }}><b>Login</b></a></p>
        </section>
      </main>
      <Footer />
    </>
  );
}
