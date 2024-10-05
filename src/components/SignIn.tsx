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
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export function SignIn() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors},
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try {
      const response = await Axios.post(
        `http://localhost:3000/api/v1/auth/login`,
        {
          email : data.email,
          password : data.password
        }
      );
      localStorage.setItem("jwtToken", response.data.token);
      navigate("/home");
    } catch (err: any) {
      if (err.response.data.msg === "User not registered") {
        setError("email",{
          type : 'manual',
          message : 'Email id not registered'
        })
      } else {
        setError("password",{
          type : 'manual',
          message : 'Incorrect password'
        })
      }
    }
  }

  return (
    <>
      <Card className="shadow-md border sm:mt-24 mt-10 mx-auto max-w-sm bg-gray-50 rounded-2xl">
        <CardHeader className="text-center pb-10">
          <CardTitle className="text-4xl">Welcome back</CardTitle>
          <CardDescription>Enter your information to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              className="grid gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                Sign In
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Do not have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
