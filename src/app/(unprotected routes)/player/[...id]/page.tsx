"use client";

import { getPlayerById } from "@/server-actions/GetPlayerById";
import { useParams } from "next/navigation";
import React from "react";

interface Player {
  id: number;
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
