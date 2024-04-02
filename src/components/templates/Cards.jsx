/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.png";

const Cards = ({ data, title }) => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-center h-full p-[3%] w-full bg-[#1f1e24]">
        {data.map((c, i) => (
          <Link to={`/${c.media_type || title}/details/${c.id}/`} className="relative w-[25vh] mr-[5%] mb-[5%]" key={i}>
            <img
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              className="w-[25vh] h-[30vh] object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            />
            {c.vote_average && (
              <div className="text-white flex justify-center items-center w-[5vh] bg-red-400 h-[5vh] rounded-full text-xl font-semibold absolute right-[-10%] bottom-[12%]">
                {(c.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
            <h1 className="text-2xl text-zinc-300 mt-4 font-semibold">
              {c.name ||
                c.title ||
                c.original_title ||
                c.original_title ||
                c.original_name}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cards;
