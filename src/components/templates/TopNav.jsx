/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../assets/noimage.png"

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);
  return (
    <>
      <div className="w-full h-[10vh] relative flex justify-start ml-[15%] items-center">
        <i className="text-zinc-400 text-3xl ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="text-zinc-200 left-[5%] w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent"
          type="text"
          placeholder="search anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
          ></i>
        )}

        <div className="z-[10] w-[62%] max-h-[50vh] bg-zinc-200 absolute top-[100%] overflow-auto rounded">
          {searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
              <img className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg" src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage } alt="" />
              <span>{s.original_title || s.name || s.original_name || s.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopNav;
