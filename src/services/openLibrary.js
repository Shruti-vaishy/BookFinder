// Simple wrapper to fetch from Open Library Search API
export async function searchBooksByTitle(title, page = 1) {
const encoded = encodeURIComponent(title)
const url = `https://openlibrary.org/search.json?title=${encoded}&page=${page}`
const res = await fetch(url)
if (!res.ok) throw new Error('Network response was not ok')
const data = await res.json()
return data
}


export function getCoverUrl(cover_i, size = 'M') {
if (!cover_i) return null
return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`
}