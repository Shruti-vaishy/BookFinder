import React from 'react'


export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search books by title...' }) {
return (
<form
onSubmit={(e) => {
e.preventDefault()
onSubmit()
}}
className="w-full max-w-3xl mx-auto"
>
<label htmlFor="search" className="sr-only">Search</label>
<div className="flex items-center gap-2">
<input
id="search"
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder={placeholder}
className="flex-1 px-4 py-3 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>
<button
type="submit"
className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
disabled={!value}
>
Search
</button>
</div>
</form>
)
}