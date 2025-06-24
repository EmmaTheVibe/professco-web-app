import Rating from "../Rating/Rating";
import styles from "./Filter.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter({ options, label, sortBy }) {
  const lowerCaseOptionValues = options.map((option) =>
    String(option.value).toLowerCase()
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawUrlOptions = searchParams.getAll(label);
  const activeOptions = rawUrlOptions.filter((paramValue) =>
    lowerCaseOptionValues.includes(paramValue.toLowerCase())
  );

  function handleFilter(optionValueToToggle) {
    const params = new URLSearchParams(searchParams);
    const urlOptionValue = String(optionValueToToggle).toLowerCase();

    const isRadioGroup = label === "rating";

    if (isRadioGroup) {
      if (activeOptions.includes(urlOptionValue)) {
        params.delete(label);
      } else {
        params.set(label, urlOptionValue);
      }
    } else {
      const currentOptions = params
        .getAll(label)
        .map((opt) => opt.toLowerCase());
      const optionIndex = currentOptions.indexOf(urlOptionValue);

      if (optionIndex === -1) {
        currentOptions.push(urlOptionValue);
      } else {
        currentOptions.splice(optionIndex, 1);
      }

      params.delete(label);

      currentOptions.forEach((opt) => {
        params.append(label, opt);
      });
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSort(order) {
    const params = new URLSearchParams(searchParams);
    const currentSortBy = params.get("sort_by");
    const currentSortOrder = params.get("sort_order");

    if (currentSortBy === sortBy && currentSortOrder === order) {
      params.delete("sort_by");
      params.delete("sort_order");
    } else {
      params.set("sort_by", sortBy);
      params.set("sort_order", order);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.box}>
        <p className={`boldFont ${styles.heading}`}>
          Filter by: {capitalizeFirstLetter(label)}
        </p>
        {options.map((option, i) => {
          const isRadioGroup = label === "rating";

          let isChecked;
          if (isRadioGroup) {
            isChecked = activeOptions[0] === String(option.value).toLowerCase();
          } else {
            isChecked = activeOptions.includes(
              String(option.value).toLowerCase()
            );
          }

          return (
            <div key={i} className={styles.option}>
              <label htmlFor={`${label}-checkbox-${i}`}>
                <input
                  type={isRadioGroup ? "radio" : "checkbox"}
                  id={`${label}-checkbox-${i}`}
                  name={label}
                  value={String(option.value)}
                  checked={isChecked}
                  onChange={() => handleFilter(option.value)}
                />

                {Number.isFinite(option.value) && (
                  <Rating count={1} rating={option.value} dark={true} />
                )}
                {option.name && <p>{option.name}</p>}
              </label>
            </div>
          );
        })}
        {sortBy && (
          <>
            <div className={styles.option}>
              <label htmlFor={`sort-${sortBy}-decr`}>
                <input
                  type="radio"
                  id={`sort-${sortBy}-decr`}
                  name={`sort-${sortBy}`}
                  value="desc"
                  checked={
                    (searchParams.get("sort_by") === sortBy &&
                      searchParams.get("sort_order") === "desc") ||
                    (!searchParams.get("sort_by") &&
                      sortBy &&
                      label === "price")
                  }
                  onChange={() => handleSort("desc")}
                />
                <p>Highest to lowest</p>
              </label>
            </div>
            <div className={styles.option}>
              <label htmlFor={`sort-${sortBy}-incr`}>
                <input
                  type="radio"
                  id={`sort-${sortBy}-incr`}
                  name={`sort-${sortBy}`}
                  value="asc"
                  checked={
                    searchParams.get("sort_by") === sortBy &&
                    searchParams.get("sort_order") === "asc"
                  }
                  onChange={() => handleSort("asc")}
                />
                <p>Lowest to highest</p>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
