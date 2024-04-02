import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncloadPerson, removePerson } from "../store/actions/peopleActions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import noimage from "../assets/noimage.png";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");
  useEffect(() => {
    dispatch(asyncloadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);
  return info ? (
    <div className="flex bg-[#1f1e24] w-screen h-[150vh] px-[5%]">
      {/* Part 1 Navigation Bar */}
      <nav className="h-[10vh] w-full text-zinc-100 text-xl flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
      </nav>
      <div className="w-[100vw] flex">
        {/* Part 2 Left Poster and Details */}
        <div className="w-[20vw] mt-[8%]">
          <img
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : noimage
            }
            className="h-[40vh] object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
          {/* Social Media */}
          <div className="text-2xl flex gap-x-5 text-white">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-black my-5">Personal Info</h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Known For: </h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.known_for_department} </h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Gender</h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.gender === 2 ? "Male" : "Female"} </h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Birthday</h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.birthday}</h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Death Day</h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.deathday ? info.detail.deathday : "Alive"}</h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Place Of Birth</h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.place_of_birth}</h1>
          <h1 className="text-md text-zinc-400 font-semibold  my-5">Also Known As</h1>
          <h1 className="text-lg text-zinc-400 my-5">{info.detail.also_known_as.join(" , ")}</h1>
        </div>
        {/* Part 3 Right Details and Information */}
        <div className="w-[80vw] mt-[8%] ml-[30px]">
          <h1 className="text-6xl text-white font-black mb-5">{info.detail.name}</h1>
          <h1 className="text-2xl mb-2 text-white font-semibold">Biography</h1>
          <p className="text-sm w-[60%] text-zinc-400">{info.detail.biography}</p>

          <h1 className="mt-5 text-lg text-zinc-400  font-semibold">Popular Movies or TV Shows</h1>
          
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between ">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
          </div>
          <div className="list text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.5)] border-2 border-zinc-700 mt-5">
            {info[category + "Credits"].cast.map((c,i) => (
              <li key={i} className="hover:bg-[#19191d] hover:text-white duration-300 cursor-pointer px-1 py-2">
              <Link to={`/${category}/details/${c.id}`} className="">
                <span>{" "} {c.name || c.title || c.original_name || c.original_title} as {c.character && ` ${c.character}`}</span>
                <span className="block ml-5"></span>
              </Link>
            </li>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
