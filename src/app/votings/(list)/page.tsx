import { getDeviceType } from "@/lib/utils/device";
import VotingsPagePC from "./pc/page";
import VotingsPageSP from "./sp/page";

export default async function VotingsPage() {
  const deviceType = await getDeviceType();
  
  // モバイルまたはタブレットの場合はSP版、それ以外はPC版
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return <VotingsPageSP />;
  }
  
  return <VotingsPagePC />;
}
