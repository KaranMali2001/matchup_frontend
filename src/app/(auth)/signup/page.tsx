"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  role :string
}

export default function () {
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    role:'',
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
      password: user.password
    };

    try {
      if(user.role=='player'){
        const response = await axios.post('http://20.244.99.47:8080/player', userData);
      if (response.status === 200) {
        router.push('/login');
      }
       }
       else{
        const response=await axios.post('http://20.244.99.47:8080/organizer',userData)
        if(response.status===200){
          router.push('/login')
        }
       }
      
      
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
    console.log(userData)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form onSubmit={handleClick}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="w-full">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First name</label>
            <input
              id="first_name"
              name="first_name"
              placeholder="Arushi"
              type="text"
              value={user.first_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="w-full">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Khandelwal"
              type="text"
              value={user.last_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              placeholder="arushi@gmail.com"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              placeholder="arushi5599"
              type="text"
              value={user.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              placeholder="********"
              type="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <div className="radio-container">
  <input
    type="radio"
    id="user-role-option"
    name="role"
    value="org"
    checked={user.role === "org"}
    onChange={handleChange}
  />
  <label htmlFor="user-role-option">Organizer</label>
  <input
    type="radio"
    id="player-role-option"
    name="role"
    value="player"
    checked={user.role === "player"}
    onChange={handleChange}
     />
  <label htmlFor="player-role-option">Player</label>
</div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
