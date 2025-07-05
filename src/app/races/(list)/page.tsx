import { getDeviceType } from "@/lib/utils/device";
import RacesDefaultPC from "./pc/RacesDefault";
import RacesByDatePC from "./pc/RacesByDate";
import RacesDefaultSP from "./sp/page";
import RacesByDateSP from "./sp/page";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function RacesPage({ searchParams }: Props) {
  const deviceType = await getDeviceType();
  const targetDate = searchParams?.targetDate as string | undefined;

  // モバイルまたはタブレットの場合はSP版、それ以外はPC版
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    // targetDateの有無でSP用も分岐したい場合はここで分岐
    return targetDate
      ? <RacesByDateSP />
      : <RacesDefaultSP />;
  }

  if (targetDate) {
    return <RacesByDatePC targetDate={targetDate} />;
  } else {
    return <RacesDefaultPC />;
  }
} 
 