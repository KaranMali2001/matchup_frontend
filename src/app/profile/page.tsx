import ProfilePage from "@/components/ProfilePage";

import { getUserData } from "@/app/api/profile/route";


interface UserData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export default async function () {
  const FinalUserData = await getUserData();
  return (
    <>
    <ProfilePage data={FinalUserData}/> 
     
     
    </>
  );
}
