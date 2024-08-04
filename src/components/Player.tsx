


import axios from "axios"
import Link from "next/link";


async function getPlayer() {
  try {
    const url =process.env.BACKEND_URL + "player"
    console.log(url)

    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      return `Error: Unexpected response status ${response.status}`;
    }
  } catch (error:any) {
    if (error.response) {
      
      return `Error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {
      // The request was made but no response was received
      return "Error: No response received from the backend.";
    } else {
     
      return `Error: ${error.message}`;
    }
  }
}

export default async function GetPlayer() {
  const playerData = await getPlayer();

  if (typeof playerData === 'string' && playerData.startsWith('Error')) {
    return playerData;  // Return the error message
  }   return (
    <div>
    
      <ul>
        {playerData.map((player:Player) => (
  <li key={player.ID} className="p-6 border border-gray-300 rounded-lg shadow-lg mb-4 bg-gradient-to-r from-blue-50 to-blue-100">
  <div className="flex flex-col space-y-2">
    <span className="text-lg font-semibold text-blue-900">ID: {player.ID}</span>
    <span className="text-xl font-bold text-blue-800">Username: {player.username}</span>
    <span className="text-sm text-blue-700">Email: {player.email}</span>
 <Link href={`/player/${player.ID}`}>click here to get player info</Link>
    
  </div>
</li>

        ))}
      </ul>
 
     
    </div>
  );
}

interface Player {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string; 
    username: string;
    password: string; 
    email: string;
    role: string;
  }