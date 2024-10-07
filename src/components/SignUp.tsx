// import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from 'axios'

import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "@/contexts/AuthContext";

interface Inputs {
  name : string
  email: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const {setRole} = useContext(AuthContext)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try {
      const response = await Axios.post(
        `http://localhost:3000/api/v1/auth/register`,
        {
          name : data.name,
          email : data.email,
          password : data.password
        }
      );
      localStorage.setItem("jwtToken", response.data.token);
      setRole(response.data.user.role)
      navigate("/home");
    } catch (err: any) {
      setError("email", {
        type : 'manual',
        message : "Email id already registered"
      })
    }
  }
  
  return (
    <Card className="shadow-md border sm:mt-8 mt-1 mx-auto max-w-sm bg-gray-50 rounded-l">
      <CardHeader className="text-center pb-10">
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="Name">Name</Label>
              <Input
                className="border-0"
                id="first-name"
                placeholder="Max"
                {...register("name", {required : 'Name is required'})}
              />
              {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  className="border-0"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                  className="border-0"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
