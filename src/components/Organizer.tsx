import axios from "axios";
import Link from "next/link";

async function getOrganizer() {
  const url = process.env.BACKEND_URL + "org";
  const response = await axios.get(url);

  return response.data;
}
export default async function Organizer() {
  const OrganizerData = await getOrganizer();

  return (
    <div>
      <ul>
        {OrganizerData.map((Organizer: Organizer) => (
          <li
            key={Organizer.ID}
            className="flex items-center p-6 rounded-lg shadow-md bg-gradient-to-r from-indigo-700 to-indigo-800 hover:opacity-90"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-lg font-bold text-teal-400">
                <span className="inline-block mr-2 bg-teal-100 rounded-full px-2 py-1 text-center">
                  {Organizer.username.charAt(0).toUpperCase()}
                </span>
                {Organizer.username}
              </span>
              <span className="text-sm text-gray-300">ID: {Organizer.ID}</span>
              <span className="text-sm text-gray-300">
                Email: {Organizer.email}
              </span>
              <Link href={`/organizer/${Organizer.ID}`}>
                {" "}
                click here for more details of org
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
interface Organizer {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string; // Optional type for DeletedAt
  username: string;
  password: string; // Consider not displaying password for security
  email: string;
  role: string;
}
