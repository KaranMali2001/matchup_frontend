import axios from "axios";
interface Organizer{
    id: number;
    }
  
  export async function GetOrganizerId(id: string) {
    console.log(id);
  
    const url = `http://20.244.99.47:8080/organizer/${id}`;
    console.log(url);
  
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