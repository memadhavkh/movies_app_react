/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadTv, removeTv } from "../store/actions/tvActions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import noimage from "../assets/noimage.png";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5), rgba(0,0,0,.6)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[200vh] px-[10%]"
    >
      {/* Part 1 Navigation Bar */}
      <nav className="h-[10vh] w-full text-zinc-100 text-xl flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* Part 2 Poster */}
      <div className="w-full flex">
        <img
          src={
            info.detail.poster_path ||
            info.detail.backdrop_path ||
            info.detail.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.poster_path || info.detail.backdrop_path
                }`
              : noimage
          }
          className="w-[25vh] h-[45vh] object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
        />
        <div className="content ml-10 mb-10">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.title ||
              info.detail.original_title}{" "}
            <small className="text-zinc-400 font-semibold">
              ({info.detail.first_air_date.split("-")[0]})
            </small>{" "}
          </h1>
          <div className="flex text-zinc-100 items-center gap-x-3 mt-5">
            {info.detail.popularity && (
              <span className="text-white flex justify-evenly items-center w-[5vh] bg-red-800 h-[3vh] rounded-md text-xl font-semibold ">
                {(info.detail.popularity / 10).toFixed()} <sub>%</sub>
              </span>
            )}
            <h1>: Popularity</h1>
            <h1 className="">{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(" , ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>
          <h1 className="text-xl italic font-semibold text-zinc-300 mt-5 ">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl text-zinc-200 my-3 ">Overview</h1>
          <p className="text-white">{info.detail.overview}</p>
          <h1 className="text-2xl text-zinc-200 my-3 ">Languages</h1>
          <p className="text-zinc-200 mb-5">{info.translations.join(" ,")}</p>
          <Link
            className="p-3 bg-[#6556cd] rounded-lg text-white"
            to={`${pathname}trailer`}
          >
            <i className="text-xl mr-3 ri-play-fill"></i>Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Platform Details  */}
      <div className="w-[80%] flex flex-col gap-y-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center gap-x-10 text-white">
            <h1>Available On Flat Rates:</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vw] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center gap-x-10 text-white">
            <h1>Available On Rent: </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vw] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center gap-x-10 text-white">
            <h1>Available to Buy: </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[4vw] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Seasons */}

      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-2xl text-zinc-200 font-semibold">Seasons</h1>
      <div className="flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
          <div key={i} className="min-w-[15%] flex flex-col mr-[20px]">
            <img
              className="h-[30vh]"
              src={s.poster_path ? 
                `https://image.tmdb.org/t/p/original/${s.poster_path}` :
                noimage
              }
            />
            <h1 className="text-2xl text-white mt-3">
              {s.name}
            </h1>
          </div>
        )) : (
          <h1>No Seasons Available</h1>
        )}
      </div>

      {/* Part 5 Recommendations and Similar */}
      <div>
        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
        <h1 className="text-2xl text-zinc-200 font-semibold">
          Recommendations
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
