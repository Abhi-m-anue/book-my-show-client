import { useNavigate, useParams } from "react-router-dom";
import movieBanner from "../assets/movie_banner.png"
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface seat {
  status: string;
}

interface movieProp {
  name: string;
  price: number;
  _id: string;
  seats: seat[];
}

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<movieProp>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await Axios.get(
          `https://book-my-show-server-jdjg.onrender.com/api/v1/movies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovie(response?.data.movie);
      } catch (err) {
        console.log(err);
        // navigate to unauthorised page
      }
    } else {
      navigate("/sign-in");
      // navigate to unauthorised page
    }
  };

  const [selectedSeatIndex, setSelectedSeatIndex] = useState<number | null>(
    null
  );
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); 

  const handleSeatClick = (index: number) => {
    if (movie?.seats[index].status === "available" && !isBooking) {
      setSelectedSeatIndex(index);
    }
  };

  const handleBookTicket = async () => {
    setIsBooking(true); 
    setBookingSuccess(false)
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await Axios.patch(
          `https://book-my-show-server-jdjg.onrender.com/api/v1/movies/${id}`,
          { seatIndex : selectedSeatIndex, status : 'booked'},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
        );
        if(response){
            setBookingSuccess(true)
        }
        fetchMovie()
      } catch (err) {
        console.log(err);
        // navigate to unauthorised page
      }
    } else {
      navigate("/");
      // navigate to unauthorised page
    }

    setSelectedSeatIndex(null);
    setIsBooking(false);
  };

  return (
    <>
      <div className="mx-auto flex justify-center">
        <img className="" src={movieBanner}></img>
      </div>
      <div className="p-8">
        <p className="text-3xl font-semibold">{movie?.name}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quasi
          inventore, fugit a recusandae aspernatur culpa vel placeat voluptatum
          aperiam! Excepturi tenetur soluta libero reprehenderit harum! Totam
          possimus mollitia adipisci.
        </p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex justify-start items-center gap-3 px-8">
            Show seats
          </AccordionTrigger>
          <AccordionContent className="mx-auto md:w-3/5 sm:w-4/5 p-6">
            <div className="grid grid-cols-8 gap-2 p-4">
              {movie?.seats.map((seat, index) => {
                return (
                  <div
                    key={index}
                    className={`sm:w-8 sm:h-8 w-7 h-7 sm:text-md text-xs rounded-md flex items-center justify-center cursor-pointer ${
                      selectedSeatIndex === index && "!bg-green-500 !text-white"
                    } ${
                      seat.status === "available" &&
                      "bg-gray-300 hover:bg-gray-400"
                    } ${
                      seat.status === "booked" &&
                      "bg-red-500 cursor-not-allowed"
                    }`}
                    title={`Seat ${index + 1}`}
                    onClick={() => handleSeatClick(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
            {selectedSeatIndex !== null && !isBooking && (
              <button
                className="mt-4 px-4 py-2 bg-[#f84464] text-white rounded"
                onClick={handleBookTicket}
              >
                Book Ticket
              </button>
            )}
            {isBooking && (
              <p className="mt-2 text-gray-600">Booking in progress...</p>
            )}
            {bookingSuccess && (
            <p className="mt-2 text-green-500">Booking successful!</p>
          )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      
    </>
  );
};

export default Movie;
