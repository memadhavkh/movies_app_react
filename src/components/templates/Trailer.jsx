import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from'../NotFound'
const Trailer = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? 
  "movie": "tv";
  const video = useSelector((state) => state[category].info.videos)
  console.log(video)
  return (
    <div className="absolute w-screen h-[100vh] flex items-center justify-center top-0 left-0 z-[10] bg-[rgba(0,0,0,0.9)]">
      <i onClick={() => navigate(-1)} className="absolute hover:text-red-500 ri-close-fill text-3xl text-white right-[5%] top-[5%]"></i>
      {video ? (
        <ReactPlayer controls height={720} width={1080} url={`https://www.youtube.com/watch?v=${video.key}`}/>
      ) : <NotFound/>}
    </div>
  )
}

export default Trailer