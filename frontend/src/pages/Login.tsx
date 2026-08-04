import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaPhone } from "react-icons/fa";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h1 className="text-center text-5xl font-black">
          MissionTrack
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Track. Improve. Achieve.
        </p>

        <button className="mt-12 flex w-full items-center justify-center gap-3 rounded-xl border py-4">
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border py-4">
          <FaPhone />
          Continue with Phone Number
        </button>

        <div className="my-8 text-center text-gray-400">
          ───────── OR ─────────
        </div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border p-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border p-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="mt-3 text-blue-600">
          Forgot Password?
        </button>

        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-bold text-white"
        >
          Sign In
        </button>
      </motion.div>
    </div>
  );
}