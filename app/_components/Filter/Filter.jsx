import Rating from "../Rating/Rating";
import styles from "./Filter.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter({ options, label, sortBy }) {
  // Ensure options.value are consistently strings for comparison with URLSearchParams
  const lowerCaseOptionValues = options.map((option) =>
    String(option.value).toLowerCase()
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get all active filter values for this 'label' from the URL
  const rawUrlOptions = searchParams.getAll(label);
  const activeOptions = rawUrlOptions.filter((paramValue) =>
    lowerCaseOptionValues.includes(paramValue.toLowerCase())
  );

  // handleFilter now takes the value of the option being toggled
  function handleFilter(optionValueToToggle) {
    const params = new URLSearchParams(searchParams);
    const urlOptionValue = String(optionValueToToggle).toLowerCase();

    // Determine if this filter group should behave like radio buttons (single selection)
    const isRadioGroup = label === "rating"; // Assuming "rating" is the label for radio options

    if (isRadioGroup) {
      // For radio buttons, set the parameter or clear it if the same option is clicked again
      if (activeOptions.includes(urlOptionValue)) {
        // If the same radio option is clicked again, it acts as a "clear"
        params.delete(label);
      } else {
        // Otherwise, set this specific radio option
        params.set(label, urlOptionValue);
      }
    } else {
      // For checkboxes (multi-selection), toggle the option
      const currentOptions = params
        .getAll(label)
        .map((opt) => opt.toLowerCase());
      const optionIndex = currentOptions.indexOf(urlOptionValue);

      if (optionIndex === -1) {
        // Option is not currently in the URL, so add it
        currentOptions.push(urlOptionValue);
      } else {
        // Option is currently in the URL, so remove it
        currentOptions.splice(optionIndex, 1);
      }

      // Clear all existing parameters for this label
      params.delete(label);

      // Re-add updated levels
      currentOptions.forEach((opt) => {
        params.append(label, opt);
      });
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    // Update the URL without a full page reload
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // --- NEW: handleSort function to manage 'sort_by' and 'sort_order' params ---
  function handleSort(order) {
    // 'order' will be 'asc' or 'desc'
    const params = new URLSearchParams(searchParams);
    const currentSortBy = params.get("sort_by");
    const currentSortOrder = params.get("sort_order");

    // Check if this specific sort combination is already active
    if (currentSortBy === sortBy && currentSortOrder === order) {
      // If the same sort option is clicked again, clear both sort params
      params.delete("sort_by");
      params.delete("sort_order");
    } else {
      // Set the new sort parameters
      params.set("sort_by", sortBy);
      params.set("sort_order", order);
    }

    // Reset to page 1 when sort changes
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Helper function to capitalize the first letter for display
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
                {" "}
                {/* Unique ID for each sort radio */}
                <input
                  type="radio"
                  id={`sort-${sortBy}-decr`}
                  name={`sort-${sortBy}`} // Name specific to this sort_by field
                  value="desc"
                  checked={
                    (searchParams.get("sort_by") === sortBy && // Check if this sortBy field is active
                      searchParams.get("sort_order") === "desc") || // And order is desc
                    // Default to 'desc' for the specified sortBy if no sort params are present
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
                  name={`sort-${sortBy}`} // Name specific to this sort_by field
                  value="asc"
                  checked={
                    searchParams.get("sort_by") === sortBy && // Check if this sortBy field is active
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
