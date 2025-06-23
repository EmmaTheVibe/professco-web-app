"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styles from "./Pagination.module.css";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// PAGE_SIZE is no longer the primary source for items per page here
import PAGE_SIZE from "@/app/_utils/constants"; // Still imported, but 'limit' takes precedence

export default function Pagination({ count }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // NEW: Read the 'limit' parameter from the URL, default to 12 if not present.
  // This aligns with how 'useCourses' sets and passes the limit to 'getSortedCourses'.
  const itemsPerPage = !searchParams.get("limit")
    ? 12
    : Number(searchParams.get("limit"));

  // Calculate pageCount using the dynamic 'itemsPerPage' (limit)
  const pageCount = Math.ceil(count / itemsPerPage);

  function handlePage(pageNumber) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    handlePage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    handlePage(prev);
  }

  if (pageCount <= 1) return null;

  return (
    <div className={styles.pagination}>
      <p className={styles.txt}>
        <em>
          Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span>
            {/* Calculate end item: If current page is last, show 'count', otherwise 'currentPage * itemsPerPage' */}
            {currentPage === pageCount ? count : currentPage * itemsPerPage}
          </span>{" "}
          of <span>{count}</span> results
        </em>
      </p>
      <div className={styles.btnPack}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <button onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
