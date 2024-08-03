"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

interface Player {
  id: number;
  }

async function getPlayerById(id: string) {
  console.log(id);

  const url = `http://20.244.99.47:8080/player/${id}`;
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

export default function PlayerComponent() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Invalid player ID</div>;
  }

  const [playerData, setPlayerData] = React.useState<Player | string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayerById(id);
      setPlayerData(data);
    };

    fetchData();
  }, [id]);

  

  if (typeof playerData === "string") {
    return <div>{playerData}</div>;
  }

  return (
    <div>
      Returning player with given ID:
      <pre>{JSON.stringify(playerData, null, 2)}</pre>
    </div>
  );
}
