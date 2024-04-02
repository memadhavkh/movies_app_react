import { Link } from "react-router-dom";

const SideNav = () => {
  
  return (
    <>
      <div className="w-[20%] h-full border-r-2 border-zinc-400 p-3 overflow-auto">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i> Movie App
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
            <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>
            <Link to="/trending" className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-fire-fill"></i>Trending</Link>
            <Link to="/popular" className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-bard-fill"></i>Popular</Link>
            <Link to="/movie" className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-movie-2-fill"></i>Movies</Link>
            <Link to="/tv" className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-tv-2-fill"></i>TV Shows</Link>
            <Link to="/person" className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-team-fill"></i>People</Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
            <h1 className="text-white font-semibold text-xl mt-10 mb-5">Information</h1>
            <Link className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-information-fill"></i>About Our App</Link>
            <Link className="p-5 hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg"><i className="mr-2 ri-phone-fill"></i>Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
