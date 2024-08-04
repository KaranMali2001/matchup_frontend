import axios from "axios";

import Link from "next/link";
async function getTournament() {
  const url =process.env.BACKEND_URL + "Tournament"
  const response = await axios.get(url);

  return response.data;
}
export default async function Tournament() {
  const TournamentData = await getTournament();
  return (
    <div>
      
      <ul>
        {TournamentData.map((Tournament: Tournament) => (
          <li
            key={Tournament.ID}
            className="flex items-center p-6 rounded-lg shadow-md bg-gradient-to-r from-indigo-700 to-indigo-800 hover:opacity-90"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-lg font-bold text-teal-400">
                <span className="inline-block mr-2 bg-teal-100 rounded-full px-2 py-1 text-center">
                  {Tournament.tournament_name.charAt(0).toUpperCase()}
                </span>
                {Tournament.tournament_name}
              </span>
              <span className="text-sm text-gray-300">ID: {Tournament.ID}</span>
              <span className="text-sm text-gray-300">
                Start Date: {Tournament.start_date}
              </span>
              <span className="text-sm text-gray-300">
                End Date: {Tournament.start_date}
              </span>
              <span className="text-sm text-gray-300">
                Total Players: {Tournament.total_player}
              </span>
              <span className="text-sm text-gray-300">
                Org name: {Tournament.organizer_name}
              </span>
              <Link href={`/tournament/${Tournament.ID}`}>
                {" "}
                click here for tournament info
              </Link>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
}
interface Tournament {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string; // Optional type for DeletedAt
  tournament_name: string;
  start_date: string;
  end_date: string;
  total_player: number;
  organizer_name: string;
  live: boolean;
}
