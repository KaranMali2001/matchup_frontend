import axios from "axios";
interface Organizer {
  id: number;
}

export async function GetOrganizerId(id: string) {
  const url = process.env.BACKEND_URL + `organizer/` + id;


  console.log(`Fetching from URL: ${url}`);

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as Organizer;
    } else {
      return response.statusText;
    }
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return "Error while fetching data from backend";
  }
}
