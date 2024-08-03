"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

interface Organizer{
  id: number;
  }

async function GetOrganizerId(id: string) {
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

export default function OrganizerComponent() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Invalid player ID</div>;
  }

  const [Data, setData] = React.useState<Organizer | string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetOrganizerId(id);
      setData(data);
    };

    fetchData();
  }, [id]);

  

  if (typeof Data === "string") {
    return <div>{Data}</div>;
  }

  return (
    <div>
      Returning player with given ID:
      <pre>{JSON.stringify(Data, null, 2)}</pre>
    </div>
  );
}
