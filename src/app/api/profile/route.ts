import { cookies } from "next/headers";
import jwtDecode from "jsonwebtoken";

import { getPlayerById } from "@/server-actions/GetPlayerById";
import { GetOrganizerId } from "@/server-actions/GetOrgById";
export async function getUserData() {
    const cookieStore=cookies()
    let FinalUserData={}
    const cookie=cookieStore.get('set-cookie')
    const decodedToken = cookie?.value ? jwtDecode.decode(cookie.value) : null;;
    let userId = "";
    let userRole = "";
    if (decodedToken && typeof decodedToken === "object") {
        userId = decodedToken.id || "";
        userRole = decodedToken.role || "";
      }
      if (userRole === "player") {
        const PlayerData = await getPlayerById(userId);
        FinalUserData = PlayerData;
      } else {
        const OrgData = await GetOrganizerId(userId);
        FinalUserData = OrgData;
      }
      
      return FinalUserData
}