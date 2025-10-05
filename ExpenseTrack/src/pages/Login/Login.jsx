import React, { useState, useRef } from "react";
import TextInputField from "../../molecules/TextInputField";
import Button from "../../atom/Button";
import PasswordInput from "../../molecules/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import CustomToast from "../../atom/Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const toast = useRef(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please check all fields",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // store JWT token in localStorage
      localStorage.setItem("token", token);

      // Fetch user details from Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful!"
        });

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "User data not found"
        });
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Login failed"
      });
    }
  };

  return (
    <>
      <section className="d-flex min-vh-100 align-items-center justify-content-center">
        <CustomToast ref={toast} />
        <div className="card align-middle border-md mx-auto w-25">
          <div className="card-body w-100 p-4 pb-5">
            <h5 className="card-title fs-2 text-center mb-3">Login</h5>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              <TextInputField
                id="email"
                label="Email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email ? { message: errors.email } : null}
                required
              />
              <PasswordInput
                id="user-password"
                label="Password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                error={errors.password ? { message: errors.password } : null}
                toggleMask={true}
                feedback={false}
                required
              />
              <Button
                type="submit"
                className="mt-3 mb-3"
              >
                Submit
              </Button>
            </form>
            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-decoration-none">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
