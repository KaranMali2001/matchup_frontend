"use client"
import ProfilePage from "@/components/ProfilePage";
import jwtDecode from 'jsonwebtoken';
import { parse } from 'cookie';
import { getPlayerById } from "@/server-actions/GetPlayerById";
import { GetOrganizerId } from "@/server-actions/GetOrgById";

export default async function (){
  const browserCookies = document.cookie;

  
  const tokens = parse(browserCookies);

 const token=tokens['set-cookie']
  
  let FinalUserData={}
  let userId = '';
  let userRole=''
  if (token) {
    try {
      const decodedToken = jwtDecode.decode(token);
      if (decodedToken && typeof decodedToken === 'object') {
        userId = decodedToken.id || '';
        userRole=decodedToken.role || ''
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }
  if (userRole === 'player'){
    const PlayerData=await getPlayerById(userId)
    FinalUserData=PlayerData
  }else{
    const OrgData=await GetOrganizerId(userId)
    FinalUserData=OrgData
  }
  return <>
  <div>
  Returning player with given ID:
  <pre>{JSON.stringify(FinalUserData, null, 2)}</pre>
</div>
  </>
}