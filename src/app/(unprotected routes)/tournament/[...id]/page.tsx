"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

interface Tournament{
  id: number;
  }

async function GetTournamentId(id: string) {


  const url = `http://20.244.99.47:8080/Tournament/${id}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as Tournament;
    } else {
      return response.statusText;
    }
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return "Error while fetching data from backend";
  }
}

export default function TournamentComponent() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Invalid player ID</div>;
  }

  const [Data, setData] = React.useState<Tournament | string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetTournamentId(id);
      setData(data);
    };

    fetchData();
  }, [id]);

  

  if (typeof Data === "string") {
    return <div>{Data}</div>;
  }

  return (
    <div>
      Returning Tournament with given ID:
      <pre>{JSON.stringify(Data, null, 2)}</pre>
    </div>
  );
}
