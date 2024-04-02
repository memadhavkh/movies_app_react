/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie App | Movies ";
  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage((prevState) => prevState + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  const refreshHandler = () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setPage(1);
      setMovies([]);
      getMovies();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return movies.length > 5 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-between px-[5%]">
        <i
          className="text-3xl mr-3 cursor-pointer hover:text-[#6556cd] ri-arrow-left-line text-zinc-400"
          onClick={() => navigate(-1)}
        ></i>
        <h1 className="text-2xl text-zinc-400 font-semibold">
          Movies<small className="text-zinc-500 text-sm ml-2">{category}</small>
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["top_rated", "popular", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        loader={<Loading />}
        next={getMovies}
        hasMore={hasMore}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
