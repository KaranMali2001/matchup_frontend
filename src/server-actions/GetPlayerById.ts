import axios from "axios";
interface Player {
  id: number;
}
export async function getPlayerById(id: string) {
  
  const url = process.env.BACKEND_URL + `player/` + id;

  console.log(`Fetching from URL: ${url}`);

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as Player;
    } else {
      return response.statusText;
    }
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return "Error while fetching data from backend";
  }
}
