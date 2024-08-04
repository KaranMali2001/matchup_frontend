"use client";

import { GetOrganizerId } from "@/server-actions/GetOrgById";
import { useParams } from "next/navigation";
import React from "react";

interface Organizer {
  id: number;
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
