import styles from "./SortBy.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBy({ options }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSort(value) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("page", 1);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={styles.sort}>
      {options.map((option, i) => (
        <p key={i} onClick={() => handleSort(option.value)}>
          {option.label}
        </p>
      ))}
    </div>
  );
}
