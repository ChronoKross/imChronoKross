import PropTypes from "prop-types";

const BlockMenu = ({ position, onSelectBlock }) => {
  const blocks = [
    {
      label: "Heading 1",
      icon: "H1",
      command: () => onSelectBlock("heading", { level: 1 }),
    },
    {
      label: "Heading 2",
      icon: "H2",
      command: () => onSelectBlock("heading", { level: 2 }),
    },
    {
      label: "Heading 3",
      icon: "H3",
      command: () => onSelectBlock("heading", { level: 3 }),
    },
    {
      label: "Bullet List",
      icon: "•",
      command: () => onSelectBlock("bulletList"),
    },
    {
      label: "Image",
      icon: "📷",
      command: () => onSelectBlock("image"),
    },
    {
      label: "Image with Text",
      icon: "🖼️",
      command: () => onSelectBlock("imageWithText"),
    },
    {
      label: "Bold",
      icon: "B",
      command: () => onSelectBlock("bold"),
    },
    {
      label: "Italic",
      icon: "I",
      command: () => onSelectBlock("italic"),
    },
  ];

  return (
    <div
      className="absolute z-50 bg-white shadow-lg border rounded-lg py-1 min-w-[160px]"
      style={{
        top: `${position.top + 24}px`, // Add offset for line height
        left: `${position.left}px`,
        transform: "translateX(-24px)", // Slight left adjustment
      }}
    >
      {blocks.map((block) => (
        <button
          key={block.label}
          onClick={block.command}
          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <span className="w-6 text-center text-gray-400">{block.icon}</span>
          {block.label}
        </button>
      ))}
    </div>
  );
};

BlockMenu.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  onSelectBlock: PropTypes.func.isRequired,
};

export default BlockMenu;
