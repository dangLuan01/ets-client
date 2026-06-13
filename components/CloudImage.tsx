"use client"

import { CldImage } from "next-cloudinary";

type CloudImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

export default function CloudImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
}: CloudImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      format="auto"
      quality="auto:eco"
      className={className}
    />
  );
}