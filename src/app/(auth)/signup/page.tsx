"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Port_Lligat_Sans } from "next/font/google";

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

  return (<div className="bg-zinc-700">
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleClick}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          name="first_name"
                          value={user.first_name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="firstName">
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          name="last_name"
                          value={user.last_name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={user.username}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={user.role}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="role">
                          Role (player/organizer)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <input
                      type="submit"
                      className="btn btn-primary btn-lg"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    );
}
 
