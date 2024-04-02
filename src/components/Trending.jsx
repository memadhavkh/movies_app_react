import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie App | Trending " + category.charAt(0).toUpperCase() + category.slice(1);
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevState) => prevState + 1);
      }
      else{
        setHasMore(false); 
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 5 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-between px-[5%]">
        <i
          className="text-3xl mr-3 cursor-pointer hover:text-[#6556cd] ri-arrow-left-line text-zinc-400"
          onClick={() => navigate(-1)}
        ></i>
        <h1 className="text-2xl text-zinc-400 font-semibold">Trending</h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        loader={<Loading />}
        next={getTrending}
        hasMore={hasMore}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
