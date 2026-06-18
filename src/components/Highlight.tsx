/**
 * Renderiza um texto destacando (em turquesa) um trecho exato dele.
 * Usado nos títulos — o texto e o trecho vêm de src/content.ts.
 */
export default function Highlight({
  text,
  mark,
  className = "text-gradient",
}: {
  text: string;
  mark?: string;
  className?: string;
}) {
  if (!mark) return <>{text}</>;
  const i = text.indexOf(mark);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{mark}</span>
      {text.slice(i + mark.length)}
    </>
  );
}
