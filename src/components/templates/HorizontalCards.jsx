/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.png";

const HorizontalCards = ({ data }) => {
  return (
    <div className="flex w-[100%] overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-[40vh] mr-5 mb-5 bg-zinc-900"
          >
            <img
              className="w-full h-[50%] object-cover"
              src={d.backdrop_path || d.poster_path ?
                `https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.poster_path
                }` : noimage
              }
            />
            <div className="p-3 text-white h-[50%] overflow-y-auto">
              <h1 className="px-2 text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="px-2 mt-3 mb-3">
                {d.overview.slice(0, 90)}
                <Link
                  to={`${d.media_type}/details/${d.id}`}
                  className="text-blue-400"
                >
                  ...more
                </Link>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-xl text-white text-center mt-10">
          Oops! Nothing To Show Here.
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
