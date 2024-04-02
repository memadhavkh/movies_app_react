/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5), rgba(0,0,0,.6)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "top 10%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        className="w-[100%] h-[50vh] flex flex-col justify-end p-[5%] rounded-lg items-start"
      >
        <h1 className=" w-[70%] text-5xl font-black text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] text-white mt-5">
          {data.overview.slice(0, 200)}
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">...more</Link>
        </p>
        <p className="text-white">
            <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}{data.release_date ? data.release_date : "No Release Date"}
            <i className="text-yellow-500 ri-album-fill ml-3"></i>{" "}{data.media_type.toUpperCase()}
        </p>
        <Link to={`${data.media_type}/details/${data.id}/trailer`} className="p-4 rounded text-white mt-5 bg-[#6556cd]">
            Watch Trailer
        </Link>
      </div>
    </>
  );
};

export default Header;
