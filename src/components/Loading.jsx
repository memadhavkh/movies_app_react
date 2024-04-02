import loader from "../assets/loader.gif"
const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1f1e24]">
        <img width={250} src={loader} alt="loader" />
    </div>
  )
}

export default Loading