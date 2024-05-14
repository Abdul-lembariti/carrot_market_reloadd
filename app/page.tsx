export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5 sm:bg-red-100 md:bg-red-300 lg:bg-red-500">
      <div className="bg-white shadow-lg p-5 rounded-xl w-full max-w-screen-sm flex flex-col gap-2 *:outline-none has-[:invalid]:bg-red-300">
        <input
          className="w-full rounded-full py-3 bg-gray-200 pl-5  focus:ring-green-300 focus:ring-2 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
          type="text"
          placeholder="Enter email here "
          required
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          Email is required
        </span>
        <button className="bg-gray-500 to-purple-300 text-white py-2 rounded-full active:scale-90 transition-transform font-medium focus:scale-90  md:px-10 peer-required:bg-green-500">
          Login
        </button>
      </div>
    </main>
  )
}
