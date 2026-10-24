"use client";

import React, { useState } from "react";
import { Code2 } from "lucide-react";

export function FallbackTechIcon({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const slug = tag.toLowerCase().replace(/[\s.\-_]/g, "");

  if (imgError) {
    return <Code2 className={className || "size-3.5 text-zinc-400"} />;
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt={tag}
      className={`${className || "size-3.5"} object-contain`}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}
