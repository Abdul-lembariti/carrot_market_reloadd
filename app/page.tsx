export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 rounded-xl w-full max-w-screen-sm ">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <span className="font-bold  text-gray-600 -mb-2 ">In transit</span>
            <span className="font-semibold text-3xl ">Coolblue</span>
          </div>
          <div className="size-12 bg-orange-600 rounded-full" />
        </div>
        <div className="flex gap-4 items-center my-2">
          <span className="text-white bg-green-400 p-1 rounded-2xl w-20 text-center uppercase font-medium hover:bg-green-500 transition hover:scale-125">
            Today
          </span>
          <span className="text-lg font-semibold ">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 absolute w-full h-2 rounded-full" />
          <div className="bg-green-400 absolute w-2/3 h-2 rounded-full" />
        </div>
        <div className="flex justify-between items-center font-light  mt-5 text-gray-600 ">
          <span>Expected</span>
          <span>Sorting</span>
          <span>In transit </span>
          <span className="text-gray-400 ">Delivered</span>
        </div>
      </div>
    </main>
  )
}
