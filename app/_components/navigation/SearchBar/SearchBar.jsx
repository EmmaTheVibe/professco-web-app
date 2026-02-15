import styles from "./SearchBar.module.css";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className={styles.searchbar}>
      <img src="/images/search.svg" alt="search icon" />
      <input
        type="text"
        className={styles.input}
        placeholder="Search"
        autoComplete="nope"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
