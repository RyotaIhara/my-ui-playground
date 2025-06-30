import { getDeviceType } from "@/lib/utils/device";
import RacesPagePC from "./pc/page";
import RacesPageSP from "./sp/page";

export default async function RacesPage() {
  const deviceType = await getDeviceType();
  
  // モバイルまたはタブレットの場合はSP版、それ以外はPC版
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return <RacesPageSP />;
  }
  
  return <RacesPagePC />;
} 