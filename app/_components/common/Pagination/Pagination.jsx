"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styles from "./Pagination.module.css";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import PAGE_SIZE from "@/app/_utils/constants";

export default function Pagination({ count, isFetching }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // const itemsPerPage = !searchParams.get("limit")
  //   ? 12
  //   : Number(searchParams.get("limit"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

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
      <button
        onClick={prevPage}
        disabled={currentPage === 1 || isFetching}
        className={styles.prev}
      >
        <img src="/images/prevarrow.svg" alt="previous" />
        <p>Previous</p>
      </button>
      <p className={styles.txt}>
        Page <span className={styles.bold}>{currentPage}</span> of{" "}
        <span className={styles.bold}>{pageCount}</span>
      </p>
      <button
        onClick={nextPage}
        disabled={currentPage === pageCount || isFetching}
        className={styles.next}
      >
        <p>Next</p>
        <img src="/images/nextarrow.svg" alt="next" />
      </button>
    </div>
  );
}
