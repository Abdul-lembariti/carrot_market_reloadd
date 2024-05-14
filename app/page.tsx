export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-3">
      <div className="bg-white shadow-lg p-5 rounded-xl w-full max-w-screen-sm flex flex-col gap-3 ">
        {['Nahul', 'Me', 'You', 'Yourselft'].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-2.5 rounded-lg odd:bg-gray-100 even:bg-cyan-100 border-b-2 pb-5 last:border-0 ">
            <div className="size-10 bg-blue-300 rounded-full" />
            <div className="w-40 h-3 rounded-full bg-gray-400 animate-pulse " />
            <div className="w-20 h-3 rounded-full bg-gray-400 animate-pulse " />
          </div>
        ))}
      </div>
    </main>
  )
}
