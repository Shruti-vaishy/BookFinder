import React from "react";
import { getCoverUrl } from "../services/openLibrary";

export default function BookCard({ book }) {
  const cover = book.cover_i
    ? getCoverUrl(book.cover_i)
    : "/src/assets/placeholder-book.jpg";
  const title = book.title || "Untitled";
  const authors = book.author_name
    ? book.author_name.join(", ")
    : "Unknown author";
  const year = book.first_publish_year || "—";

  return (
    <article className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <img
        src={cover}
        alt={`Cover of ${title}`}
        className="w-24 h-36 object-cover rounded"
        onError={(e) => (e.target.src = "/src/assets/placeholder-book.jpg")}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{authors}</p>
        <div className="mt-3 text-sm text-gray-500 flex gap-4">
          <span>First published: {year}</span>
          <span>Edition count: {book.edition_count ?? 0}</span>
        </div>
        {book.subject && (
          <div className="mt-3">
            <span className="text-xs text-gray-500">Subjects: </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {book.subject.slice(0, 6).map((s, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
