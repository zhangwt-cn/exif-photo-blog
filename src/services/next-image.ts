import { BASE_URL } from '@/site/config';

// Explicity defined next.config.js `imageSizes`
type NextCustomSize = 200;

type NextImageDeviceSize = 640 | 750 | 828 | 1080 | 1200 | 1920 | 2048 | 3840;

export type NextImageSize = NextCustomSize | NextImageDeviceSize;

export const MAX_IMAGE_SIZE: NextImageSize = 3840;

export const getNextImageUrlForRequest = (
  imageUrl: string,
  size: NextImageSize,
  quality = 75,
  baseUrl = BASE_URL,
) => {
  const url = new URL(`${baseUrl}/_next/image`);

  url.searchParams.append('url', imageUrl);
  url.searchParams.append('w', size.toString());
  url.searchParams.append('q', quality.toString());

  // if url is video
  if (/\.(mp4|webm|ogg|mov)$/.test(imageUrl)) {
    return imageUrl;
  }

  return url.toString();
};

// Generate small, low-bandwidth images for quick manipulations such as
// generating blur data or image thumbnails for AI text generation
export const getNextImageUrlForManipulation = (imageUrl: string) =>
  getNextImageUrlForRequest(imageUrl, 640, 90);
