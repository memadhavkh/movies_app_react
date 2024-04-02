/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "Movie App | Home";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);
  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />
        <div className="p-5 flex justify-between">
          <h1 className="text-3xl p-5 text-zinc-400 font-semibold">
            This Week&#39;s Trending
          </h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=> setCategory(e.target.value)}/>
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
}

export default Home;
