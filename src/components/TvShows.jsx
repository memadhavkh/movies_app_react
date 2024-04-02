/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tvshows, setTvshows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "TV Shows";
  const getTvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTvshows((prevState) => [...prevState, ...data.results]);
        setPage((prevState) => prevState + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  const refreshHandler = () => {
    if (tvshows.length === 0) {
      getTvshows();
    } else {
      setPage(1);
      setTvshows([]);
      getTvshows();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tvshows.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-between px-[5%]">
        <i
          className="text-3xl mr-3 cursor-pointer hover:text-[#6556cd] ri-arrow-left-line text-zinc-400"
          onClick={() => navigate(-1)}
        ></i>
        <h1 className="text-2xl text-zinc-400 font-semibold absolute left-[7%]">
          Tv Shows
          <small className="text-zinc-500 text-sm ml-2">{category}</small>
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={tvshows.length}
        loader={<Loading />}
        next={getTvshows}
        hasMore={hasMore}
      >
        <Cards data={tvshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
