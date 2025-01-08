'use client';

import { useState } from 'react';

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

export default function LinkPreviewer() {
  const [url, setUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [error, setError] = useState<string>('');

  const fetchMetadata = async () => {
    setError('');
    setMetadata(null);

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const res = await fetch(`/api/parse-meta?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch metadata');
      }

      const data: Metadata = await res.json();
      setMetadata(data);
    } catch (err) {
      console.log(err);
      setError('Error fetching metadata. Please check the URL.');
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL"
        className="border p-2 rounded w-full"
      />
      <button onClick={fetchMetadata} className="bg-blue-500 text-white p-2 rounded mt-2">
        Fetch Metadata
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {metadata && (
        <div className="mt-4">
          <h1 className="font-bold text-xl">{metadata.title}</h1>
          <p>{metadata.description}</p>
          {metadata.image && <img src={metadata.image} alt="Preview" className="mt-2 w-full" />}
        </div>
      )}
    </div>
  );
}
