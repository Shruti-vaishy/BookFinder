import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";
import { searchBooksByTitle } from "./services/openLibrary";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      setNumFound(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    searchBooksByTitle(debouncedQuery, page)
      .then((data) => {
        setBooks(data.docs || []);
        setNumFound(data.numFound || 0);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching results.");
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);

  function handleSearchSubmit() {
    // When user explicitly submits, jump to page 1 and trigger fetch via query
    setPage(1);
  }

  const resultsPerPage = 100; // OpenLibrary returns up to 100 per page
  const totalPages = Math.ceil(numFound / resultsPerPage) || 1;
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-extrabold text-red-600 text-center">BookFinder</h1>
        <p className="text-red-600 mt-1 text-center">
          Search books by title using Open Library.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
        />

        <section className="mt-6">
          {loading && <div className="text-center py-12">Loading results…</div>}

          {error && <div className="text-center text-red-600">{error}</div>}

          {!loading && !error && debouncedQuery && books.length === 0 && (
            <div className="text-center py-12 text-red-600">
              No results found for "{debouncedQuery}"
            </div>
          )}

          {!loading && books.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              {books.map((b, i) => (
                <BookCard key={`${b.key}-${i}`} book={b} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />

          {numFound > 0 && (
            <div className="mt-4 text-sm text-red-600">
              Showing page {page} — {numFound} results total
            </div>
          )}
        </section>
      </main>

      <footer className="max-w-4xl mx-auto mt-10 text-center text-sm text-red-600">
        Data from Open Library.
      </footer>
    </div>
  );
}
