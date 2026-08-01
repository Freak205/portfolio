import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { seo } from "@/content/site";

export const alt = seo.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage();
}
