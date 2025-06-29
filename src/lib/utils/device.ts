import { headers } from 'next/headers';

export async function isMobileDevice(): Promise<boolean> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  // モバイルデバイスの判定
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
}

export async function isTabletDevice(): Promise<boolean> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  // タブレットデバイスの判定
  const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i;
  return tabletRegex.test(userAgent);
}

export async function getDeviceType(): Promise<'mobile' | 'tablet' | 'desktop'> {
  if (await isMobileDevice()) return 'mobile';
  if (await isTabletDevice()) return 'tablet';
  return 'desktop';
} 