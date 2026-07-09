export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-black">
        Good Evening Ram 👋
      </h1>

      <p className="mt-4 text-gray-600">
        Welcome to MissionTrack
      </p>

      <div className="mt-12 grid grid-cols-3 gap-6">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Mission
          </h2>

          <p className="mt-4">
            Become Software Engineer
          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            🔥 Streak
          </h2>

          <h1 className="mt-4 text-5xl font-black">
            0
          </h1>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Progress
          </h2>

          <h1 className="mt-4 text-5xl font-black">
            0%
          </h1>

        </div>

      </div>

    </div>
  );
}