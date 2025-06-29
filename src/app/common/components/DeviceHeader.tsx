import { getDeviceType } from "@/lib/utils/device";
import { Header as PCHeader } from "./pc/Header";
import { Header as SPHeader } from "./sp/Header";

export const DeviceHeader = async () => {
  const deviceType = await getDeviceType();
  
  // モバイルまたはタブレットの場合はSP版、それ以外はPC版
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return <SPHeader />;
  }
  
  return <PCHeader />;
}; 