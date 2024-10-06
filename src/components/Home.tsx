import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moviePoster from '../assets/movie_img.webp'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface seat {
  status: string;
}

interface movieProp {
  name: string;
  price: number;
  _id: string;
  seats: seat[];
}

function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<movieProp[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await Axios.get(
          "http://localhost:3000/api/v1/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data.movies);
        console.log(response);
      } catch (err) {
        console.log(err);
        // navigate to unauthorised page
      }
    } else {
      navigate("/sign-in");
      // navigate to unauthorised page
    }
  };

  return (
    <>
     
    <header className="flex py-3 px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Movies
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Stream
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Events
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Sports
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Activities
          </a>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent  side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </a>
              <a href="#" className="hover:text-foreground">
                Movies
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Stream
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Events
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Sports
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Activities
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white p-5 rounded-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex justify-center bg-red-50 pt-10">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-4/5">
        {movies.map((movie) => {
          return (
            <Card className="hover:cursor-pointer">
              <CardHeader className="p-0">
              <img src={moviePoster} alt="movie poster" className="rounded-lg rounded-b-none"></img>
                
              </CardHeader>
              <CardFooter className="flex justify-between p-3">
                <p className="text-l font-semibold">{movie.name}</p>
                {/* <p>book</p> */}
                {/* <p>Price : {movie.price}</p> */}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      </div>
    </>
  );
}

export default Home;
