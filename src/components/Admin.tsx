import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";


interface Movie {
  _id: string;
  name: string;
  price?: number;
  seats: { status: string }[];
}

interface FormData {
  name: string;
  price?: number;
  seats: number;
}

const Admin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await Axios.get(
          "https://book-my-show-server-jdjg.onrender.com/api/v1/admin/movies",
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

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/sign-in");
      return;
    }

    try {
      if (editingMovie) {
        await Axios.patch(
          `https://book-my-show-server-jdjg.onrender.com/api/v1/admin/movies/${editingMovie._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage("Movie updated successfully!");
      } else {
        // Create Movie
        await Axios.post(`https://book-my-show-server-jdjg.onrender.com/api/v1/admin/movies`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage("Movie created successfully!");
      }
    } catch (err) {
      console.log(err);
      // navigate to unauthorised page
    }

    reset();
    setEditingMovie(null);
    fetchMovies();
    setTimeout(() => setSuccessMessage(null), 3000); 
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    reset({
      name: movie.name,
      price: movie.price,
      seats: movie.seats.length,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token && movieToDelete) {
      try {
        await Axios.delete(`https://book-my-show-server-jdjg.onrender.com/api/v1/admin/movies/${movieToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage("Movie deleted successfully!");
        fetchMovies();
        setTimeout(() => setSuccessMessage(null), 3000); 
      } catch (err) {
        console.log(err);
        // navigate to unauthorised page
      }
    } else {
      navigate("/sign-in");
      // navigate to unauthorised page
    }
    setMovieToDelete(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Admin - Movie Management</h1>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Movie Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter movie name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price (optional)</label>
          <input
            type="number"
            {...register("price")}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Number of Seats</label>
          <input
            type="number"
            {...register("seats", { required: true })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter number of seats"
            disabled={!!editingMovie}
          />
        </div>
        <button
          type="submit"
          className="bg-[#f84464] text-white rounded px-4 py-2"
        >
          {editingMovie ? "Update Movie" : "Create Movie"}
        </button>
        {editingMovie && (
          <button
            type="button"
            className="ml-4 text-red-500"
            onClick={() => {
              setEditingMovie(null);
              reset();
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      <h2 className="text-xl mb-4">All Movies</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Name</th>
            <th className="border-b py-2 px-4 text-left">Price</th>
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie) => (
            <tr key={movie._id}>
              <td className="border-b py-2 px-4">{movie.name}</td>
              <td className="border-b py-2 px-4">{movie.price || "N/A"}</td>
              <td className="border-b py-2 px-4">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(movie)}
                >
                  Edit
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="text-red-500"
                      onClick={() => setMovieToDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this movie? This action cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDelete}
                      >
                        Confirm
                      </button>
                      <DialogClose><button
                        className="ml-4 text-gray-500"
                        onClick={() => setMovieToDelete(null)}
                      >
                        Cancel
                      </button></DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
