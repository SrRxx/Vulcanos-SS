/* eslint-disable react/prop-types */
export default function Item({ icon, text, ...args }) {

    const mouseMove = (e) => {
        e.preventDefault();
        console.log(e);
    }

  return (
    <li draggable={true} onDragStart={mouseMove} className="tool-item" {...args}>
      {icon}
      <span className="tool-text">{text}</span>
    </li>
  );
}
