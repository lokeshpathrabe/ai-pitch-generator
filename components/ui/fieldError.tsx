export function FieldError({ error }: { error?: string | null }) {
  if (!error) return null;
  return <div className="text-red-600 text-sm">{error}</div>;
}
