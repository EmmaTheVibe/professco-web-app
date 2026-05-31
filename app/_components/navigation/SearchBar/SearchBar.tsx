import styles from "./SearchBar.module.css";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className={styles.searchbar}>
      <img src="/images/search.svg" alt="search icon" />
      <input
        type="text"
        className={styles.input}
        placeholder="Search"
        autoComplete="nope"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
    </div>
  );
}
