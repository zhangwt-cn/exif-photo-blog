import { IMAGE_WIDTH_MEDIUM, ImageProps } from '.';
import ImageWithFallback from './ImageWithFallback';

export default function ImageMedium(props: ImageProps) {
  const {
    aspectRatio,
    blurCompatibilityMode,
    src,
    ...rest
  } = props;
  return (
    <ImageWithFallback {...{
      src,
      ...rest,
      blurCompatibilityLevel: blurCompatibilityMode ? 'high' : 'none',
      width: IMAGE_WIDTH_MEDIUM,
      height: Math.round(IMAGE_WIDTH_MEDIUM / aspectRatio),
    }} />
  );
};
