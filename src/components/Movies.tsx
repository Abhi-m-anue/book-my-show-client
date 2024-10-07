import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moviePoster from "../assets/movie_img.webp";

import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface seat {
  status: string;
}

interface movieProp {
  name: string;
  price: number;
  _id: string;
  seats: seat[];
}

const Movies = () => {
  const [movies, setMovies] = useState<movieProp[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await Axios.get(
          "https://book-my-show-server-jdjg.onrender.com/api/v1/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data.movies);
      } catch (err) {
        console.log(err);
        // navigate to unauthorised page
      }
    } else {
      navigate("/sign-in");
      // navigate to unauthorised page
    }
  };

  return(
    <>
    <div className="flex justify-center bg-red-50 pt-10">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-4/5">
      {movies.map((movie) => {
        return (
          <Card className="hover:cursor-pointer" onClick={()=>{
            navigate(`movie/${movie._id}`)
          }}>
            <CardHeader className="p-0">
              <img
                src={moviePoster}
                alt="movie poster"
                className="rounded-lg rounded-b-none"
              ></img>
            </CardHeader>
            <CardFooter className="flex justify-between p-3">
              <p className="text-l font-semibold">{movie.name}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  </div>;
    </>
  )
};
export default Movies;
