import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import TextInputField from "../../molecules/TextInputField";
import Button from "../../atom/Button";
import PasswordInput from "../../molecules/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import CustomToast from "../../atom/Toast";
import { useAuth } from "../../routes/Authenticator";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange"
  });

  const toast = useRef(null);
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("token", token);

      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setIsAuthenticated(true);

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful!",
        });

        navigate("/dashboard", { replace: true });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "User data not found",
        });
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Login failed",
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-4"
            >
              <TextInputField
                id="email"
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                error={errors.email ? { message: errors.email.message } : null}
                required
              />
              <PasswordInput
                id="user-password"
                name="password"
                label="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /(?=.*[A-Za-z])(?=.*\d)/,
                    message: "Password must contain both letters and numbers"
                  }
                })}
                error={errors.password}
                toggleMask={true}
                feedback={false}
                required
              />
              <Button type="submit" className="mt-3 mb-3">
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
