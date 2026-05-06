import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getClient } from "./client";

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(getClient()).image(source);
}
