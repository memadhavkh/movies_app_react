/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import TopNav from './templates/TopNav';
import Dropdown from './templates/Dropdown';
import Cards from './templates/Cards';


const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Celebrities";
  const getPerson = async () => {
    try {
      const { data }  = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
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
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return person.length > 5 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center justify-between px-[5%]">
        <i
          className="text-3xl mr-3 cursor-pointer hover:text-[#6556cd] ri-arrow-left-line text-zinc-400"
          onClick={() => navigate(-1)}
        ></i>
        <h1 className="text-2xl text-zinc-400 font-semibold">People</h1>
        <TopNav />
        <div className="w-[2%]"></div>
        
      </div>
      <InfiniteScroll
        dataLength={person.length}
        loader={<Loading />}
        next={getPerson}
        hasMore={hasMore}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default People