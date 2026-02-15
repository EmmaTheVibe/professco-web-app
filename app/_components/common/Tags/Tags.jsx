"use client";

import styles from "./Tags.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Tags() {
  const tags = ["All", "Special Offer", "New", "Best Seller"];
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formatTagForUrlParam = (tagDisplayName) => {
    if (tagDisplayName.toLowerCase() === "all") {
      return null;
    }

    return tagDisplayName.toLowerCase().replace(/\s+/g, "-");
  };

  const formatUrlParamToDisplay = (urlParam) => {
    if (!urlParam) {
      return "all";
    }

    return urlParam.replace(/-/g, " ");
  };

  const rawTagFromUrl = searchParams?.get("tags");

  const displayFormatFromUrl = formatUrlParamToDisplay(rawTagFromUrl);

  const activeTag = lowerCaseTags.includes(displayFormatFromUrl)
    ? displayFormatFromUrl
    : "all";

  function handleTag(tagDisplayName) {
    const formattedTagForUrl = formatTagForUrlParam(tagDisplayName);

    const params = new URLSearchParams(searchParams);

    if (formattedTagForUrl === null) {
      params.delete("tags");
    } else {
      params.set("tags", formattedTagForUrl);
    }

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={styles.tagbox}>
      <p className={styles.txt}>Tags:</p>
      <div className={styles.tagline}>
        {tags.map((tagDisplayName, i) => (
          <div
            key={i}
            className={`${styles.tag} ${
              tagDisplayName.toLowerCase() === activeTag && styles.activeTag
            }`}
            onClick={() => handleTag(tagDisplayName)}
          >
            <p>{tagDisplayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
