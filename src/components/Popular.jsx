/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import TopNav from './templates/TopNav';
import Dropdown from './templates/Dropdown';
import Cards from './templates/Cards';

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Popular " + category.charAt(0).toUpperCase() + category.slice(1);
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    popular.length > 5 ? (
        <div className="w-screen h-screen">
          <div className="w-full flex items-center justify-between px-[5%]">
            <i
              className="text-3xl mr-3 cursor-pointer hover:text-[#6556cd] ri-arrow-left-line text-zinc-400"
              onClick={() => navigate(-1)}
            ></i>
            <h1 className="text-2xl text-zinc-400 font-semibold">Popular </h1>
            <TopNav />
            <Dropdown
              title="Category"
              options={["movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
            
          </div>
          <InfiniteScroll
            dataLength={popular.length}
            loader={<Loading />}
            next={getPopular}
            hasMore={hasMore}
          >
            <Cards data={popular} title={category} />
          </InfiniteScroll>
        </div>
      ) : (
        <Loading />
      )
      
  )
}

export default Popular