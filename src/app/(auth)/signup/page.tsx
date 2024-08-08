"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react"

  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export default function RegistrationForm() {
  const [user, setUser] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
    };
  console.log(process.env.BACKEND_URL)
    try {
      const url = user.role === "player" ? "http://20.244.99.47:8080/player" : "http://20.244.99.47:8080/organizer";
      const response = await axios.post(url, userData);
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return  <>
      <Card className="w-[350px] bg-transparent">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>

      </Card>
 </>

  }
  


 
