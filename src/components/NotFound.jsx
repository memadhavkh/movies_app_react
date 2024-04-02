import Notfound from "../assets/notfound.jpg"
const Loading = () => {
  
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1f1e24]">
        <img width={500} src={Notfound} alt="loader" />
    </div>
  )
}

export default Loading