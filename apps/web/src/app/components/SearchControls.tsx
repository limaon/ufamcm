export type SearchResult = {
  id: number | string;
  name: string;
  category: string;
};

type SearchControlsProps = {
  query: string;
  results: SearchResult[];
  onQueryChange: (query: string) => void;
  onSelectResult: (id: number | string) => void;
};

export default function SearchControls({
  query,
  results,
  onQueryChange,
  onSelectResult,
}: SearchControlsProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <section
      data-testid="search-controls"
      style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        zIndex: 1,
        width: '280px',
        transform: 'translateX(-50%)',
        padding: '12px',
        background: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgb(0 0 0 / 20%)',
      }}
    >
      <label htmlFor="feature-search">Buscar features</label>
      <input
        id="feature-search"
        type="search"
        aria-label="Buscar features"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Nome ou categoria"
        style={{ width: '100%', marginTop: '6px' }}
      />

      {hasQuery && (
        <div
          data-testid="search-results"
          aria-live="polite"
          style={{ marginTop: '8px' }}
        >
          {results.length === 0 ? (
            <p>Nenhuma feature encontrada.</p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={String(result.id)}>
                  <button
                    type="button"
                    onClick={() => onSelectResult(result.id)}
                  >
                    {result.name} ({result.category})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
