import {
  Photo,
  PhotoDateRange,
  descriptionForPhotoSet,
  photoQuantityText,
} from '@/photo';
import {
  absolutePathForTag,
  absolutePathForTagImage,
  getPathComponents,
} from '@/site/paths';
import { capitalizeWords, convertStringToArray } from '@/utility/string';

// Reserved/virtual tags
export const TAG_FAVS   = 'favs';   // Reserved
export const TAG_HIDDEN = 'hidden'; // Virtual 

export type TagsWithMeta = {
  tag: string
  count: number
}[]

export const formatTag = (tag?: string) =>
  capitalizeWords(tag?.replaceAll('-', ' '));

export const doesStringContainReservedTags = (tags?: string) =>
  convertStringToArray(tags)?.some(tag => (
    isTagFavs(tag) ||
    tag.toLowerCase() === TAG_HIDDEN
  ));

export const titleForTag = (
  tag: string,
  photos:Photo[] = [],
  explicitCount?: number,
) => [
  formatTag(tag),
  photoQuantityText(explicitCount ?? photos.length),
].join(' ');

export const sortTags = (
  tags: string[],
  tagToHide?: string,
) => tags
  .filter(tag => tag !== tagToHide)
  .sort((a, b) => isTagFavs(a) ? -1 : a.localeCompare(b));

export const sortTagsObject = (
  tags: TagsWithMeta,
  tagToHide?: string,
) => tags
  .filter(({ tag }) => tag!== tagToHide)
  .sort(({ tag: a }, { tag: b }) => isTagFavs(a) ? -1 : a.localeCompare(b));

export const sortTagsWithoutFavs = (tags: string[]) =>
  sortTags(tags, TAG_FAVS);

export const sortTagsObjectWithoutFavs = (tags: TagsWithMeta) =>
  sortTagsObject(tags, TAG_FAVS);

export const descriptionForTaggedPhotos = (
  photos: Photo[] = [],
  dateBased?: boolean,
  explicitCount?: number,
  explicitDateRange?: PhotoDateRange,
) =>
  descriptionForPhotoSet(
    photos,
    'tagged',
    dateBased,
    explicitCount,
    explicitDateRange,
  );

export const generateMetaForTag = (
  tag: string,
  photos: Photo[],
  explicitCount?: number,
  explicitDateRange?: PhotoDateRange,
) => ({
  url: absolutePathForTag(tag),
  title: titleForTag(tag, photos, explicitCount),
  description:
    descriptionForTaggedPhotos(photos, true, explicitCount, explicitDateRange),
  images: absolutePathForTagImage(tag),
});

export const isTagFavs = (tag: string) => tag.toLowerCase() === TAG_FAVS;

export const isPhotoFav = ({ tags }: Photo) => tags.some(isTagFavs);

export const isPathFavs = (pathname?: string) =>
  getPathComponents(pathname).tag === TAG_FAVS;

export const addHiddenToTags = (tags: TagsWithMeta, hiddenPhotosCount = 0) => {
  if (hiddenPhotosCount > 0) {
    return tags
      .filter(({ tag }) => tag === TAG_FAVS)
      .concat({ tag: TAG_HIDDEN, count: hiddenPhotosCount })
      .concat(tags.filter(({ tag }) => tag !== TAG_FAVS));
  } else {
    return tags;
  }
};
