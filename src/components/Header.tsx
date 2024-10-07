import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT from localStorage
    localStorage.removeItem("jwtToken");
    // Redirect to home
    navigate("/");
  };

  return (
    <header className="flex py-3 px-6 bg-[#f84464]">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <a href="#" className="transition-colors hover:text-foreground">
          Movies
        </a>
        <a href="#" className="text-white transition-colors hover:text-foreground">
          Stream
        </a>
        <a href="#" className="text-white transition-colors hover:text-foreground">
          Events
        </a>
        <a href="#" className="text-white transition-colors hover:text-foreground">
          Sports
        </a>
        <a href="#" className="text-white transition-colors hover:text-foreground">
          Activities
        </a>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a href="#" className="hover:text-foreground">Movies</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Stream
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Events
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Sports
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
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
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 text-white hover:bg-gray-700"
            >
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-md bg-gray-800 text-white p-3 shadow-lg"
          >
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 hover:bg-gray-700 transition-colors rounded-md"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
