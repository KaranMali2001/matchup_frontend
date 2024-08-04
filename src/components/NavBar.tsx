"use client";
import { useAuth } from "@/lib/AuthContextProvider";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState, FormEvent } from "react";

export default function NavBar() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  

 

  const handleLogOut = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("backend URL:",process.env.BACKEND_URL)
      const url ="http://localhost:8080/" + "logout"
      console.log("final url:",url)
    
      const response = await axios.get(
        url,

        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        logout();
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError("Please try again.");
      } else {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    }
  };
  return (
    <Navbar className="bg-black text-white h-20">
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/organizer">
            Organizers
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/tournament" aria-current="page">
            Tournaments
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/player">
            Players
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {isAuthenticated ? (
            <button onClick={handleLogOut} className="text-white">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
