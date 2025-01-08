interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

interface LinkPreviewerProps {
  searchParams: { url?: string };
}

async function fetchMetadata(url: string): Promise<Metadata | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/parse-meta?url=${encodeURIComponent(url)}`);

    if (!res.ok) {
      console.error('Failed to fetch metadata');
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching metadata:', err);
    return null;
  }
}

export default async function LinkPreviewer({ searchParams }: LinkPreviewerProps) {
  const url = searchParams.url || '';
  const metadata = url ? await fetchMetadata(url) : null;

  return (
    <div className="p-4">
      <form method="GET" className="mb-4">
        <input
          type="text"
          name="url"
          defaultValue={url}
          placeholder="Enter a URL"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          Fetch Metadata
        </button>
      </form>

      {metadata ? (
        <div className="mt-4">
          <h1 className="font-bold text-xl">{metadata.title}</h1>
          <p>{metadata.description}</p>
          {metadata.image && <img src={metadata.image} alt="Preview" className="mt-2 w-full" />}
        </div>
      ) : (
        url && <p className="text-red-500 mt-2">No metadata found or invalid URL.</p>
      )}
    </div>
  );
}
