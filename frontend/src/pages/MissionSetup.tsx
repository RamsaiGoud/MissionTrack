import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MissionSetup() {
  const [mission, setMission] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">

      <div className="w-full max-w-lg">

        <h1 className="text-5xl font-black text-center">
          What's Your Mission?
        </h1>

        <input
          className="mt-12 w-full rounded-xl border p-5 text-lg"
          placeholder="Become Software Engineer"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
        />

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-xl font-bold text-white"
        >
          Create Mission
        </button>

      </div>

    </div>
  );
}