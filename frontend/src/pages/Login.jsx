import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginStudent } from "../api";
import { validateStudentForm } from "../utils/validateStudent";

export default function Login() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.emailst.value.trim();
    const password = form.passst.value.trim();

    const messages = validateStudentForm({ full_name: "dummy", email, password, university: "dummy", city: "dummy" });

    if (messages.length > 0) {
      setError(messages.join("\n"));
      return;
    }

    try {
      const res = await loginStudent(email, password);
      const student = res.data.student;

      localStorage.setItem("role", "student");
      localStorage.setItem("studentId", student.id);

      window.location.href = "/Welcome";
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="mainlogin">
        <img src="/media/enter.png" alt="login" style={{ width: 50, marginBottom: 5 }} />
        <p className="endform" style={{ color: "rgb(20,20,26)" }}>Welcome Back</p>
        <p className="endform" style={{ color: "gray" }}>Login to your account to continue</p>

        <div className="empstu">
          <a className="al actform" href="/login"><b>Student</b></a>
          <a className="al choose" href="/emplogin"><b>Employer</b></a>
        </div>

        <section className="loginform">
          <form onSubmit={handleSubmit}>
            <label htmlFor="emailst">Email</label>
            <input className="inputlog" type="text" id="emailst" name="emailst" placeholder="enter your email" />

            <label htmlFor="passst">Password</label>
            <input className="inputlog" type="password" id="passst" name="passst" placeholder="enter your password" />

            {error && <small className="error">{error}</small>}

            <button className="btnlog" type="submit"><b>Login as Student</b></button>
          </form>

          <p className="endform">
            Don't have an account? <a href="/sign" style={{ color: "blue", textDecoration: "none" }}><b>Sign Up</b></a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
