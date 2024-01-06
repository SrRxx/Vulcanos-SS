// eslint-disable-next-line react/prop-types
export default function List({ title, items }) {
  return (
    <details>
      <summary className="tools-name">{title}</summary>
      <ul className="tools-list">{items}</ul>
    </details>
  );
}
