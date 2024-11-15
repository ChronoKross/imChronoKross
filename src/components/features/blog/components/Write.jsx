// Importing necessary modules and components
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import { Node, mergeAttributes } from "@tiptap/core";
import { Resizable } from "re-resizable";
import Italic from "@tiptap/extension-italic";
import { createPost } from "../BlogAPI";
import BlockMenu from "./BlockMenu";

// Define a new extension for image with text
const ImageWithText = Node.create({
  name: "imageWithText",
  group: "block",
  content: "inline*",
  inline: false,
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="imageWithText"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "imageWithText",
        class: "flex items-center",
      }),
      [
        "img",
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          class: "w-1/2 h-auto mr-4",
        },
      ],
      ["div", { class: "w-1/2" }, 0],
    ];
  },
});

// Define a new extension for resizable image with text
const ResizableImageWithText = Node.create({
  name: "resizableImageWithText",
  group: "block",
  content: "inline*",
  inline: false,
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "50%",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="resizableImageWithText"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "resizableImageWithText",
        class: "flex items-center",
      }),
      [
        "div",
        {
          class: "resizable-container",
          style: `width: ${HTMLAttributes.width}`,
        },
        [
          "img",
          {
            src: HTMLAttributes.src,
            alt: HTMLAttributes.alt,
            class: "h-auto mr-4",
          },
        ],
      ],
      ["div", { class: "w-1/2" }, 0],
    ];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      container.classList.add("flex", "items-center");

      const resizableContainer = document.createElement("div");
      resizableContainer.classList.add("resizable-container");
      resizableContainer.style.width = node.attrs.width;

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt;
      img.classList.add("h-auto", "mr-4");

      const content = document.createElement("div");
      content.classList.add("w-1/2");

      resizableContainer.appendChild(img);
      container.appendChild(resizableContainer);
      container.appendChild(content);

      const resizable = new Resizable({
        onResizeStop: (e, direction, ref, d) => {
          const newWidth = ref.style.width;
          editor.commands.updateAttributes("resizableImageWithText", {
            width: newWidth,
          });
        },
      });

      return {
        dom: container,
        contentDOM: content,
      };
    };
  },
});

// Main Write component
const Write = () => {
  // Local state hooks for managing input values, editor states, and loading status
  const [title, setTitle] = useState(""); // Post title
  const [slug, setSlug] = useState(""); // Slug generated from the title
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [showMenu, setShowMenu] = useState(false); // Visibility state for the block menu
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 }); // Position of the block menu

  // Editor instance with configurations and extensions
  const editor = useEditor({
    extensions: [
      // StarterKit extension, which includes core features for the editor
      StarterKit.configure({
        heading: {
          // Configure heading levels with specific HTML attributes
          HTMLAttributes: {
            1: { class: "text-4xl font-bold mb-4 text-gray-900" },
            2: { class: "text-3xl font-semibold mb-3 text-gray-800" },
            3: { class: "text-2xl font-medium mb-2 text-gray-700" },
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "mb-3 text-base text-gray-600 leading-relaxed",
          },
        },
      }),
      // Additional editor extensions for specific content blocks
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4 my-2",
        },
        keepMarks: true,
        keepAttributes: true,
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "text-gray-600",
        },
        content: "paragraph",
        keepMarks: true,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-lg my-4",
        },
      }),
      Bold,
      Italic,
      ImageWithText,
      ResizableImageWithText,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-full focus:outline-none min-h-[200px]",
      },
      // Key handling for the editor - prevents Enter key from behaving differently in list items
      handleKeyDown: (view, event) => {
        if (
          event.key === "Enter" &&
          view.state.selection.$from.parent.type.name === "listItem"
        ) {
          return false;
        }
        return false;
      },
    },
    // Handling editor content updates to determine block menu visibility
    onUpdate: ({ editor }) => {
      const { from } = editor.state.selection;
      const text = editor.state.doc.textBetween(from - 1, from, " ");

      if (text === "/") {
        // If "/" is typed, show the block menu at the cursor position
        const coords = editor.view.coordsAtPos(from);
        const editorElement = editor.view.dom;
        const editorRect = editorElement.getBoundingClientRect();

        setShowMenu(true);
        setMenuPosition({
          // Calculate position relative to the editor container
          top: coords.bottom - editorRect.top + editorElement.scrollTop,
          left: coords.left - editorRect.left + editorElement.scrollLeft,
        });
      } else {
        setShowMenu(false);
      }
    },
  });

  // Function to generate a URL-friendly slug from the post title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handler for title changes, generates slug dynamically
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  // Handler for form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get HTML content from the editor
      const content = editor.getHTML();
      const postData = { data: { title, content, slug } };
      await createPost(postData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle selection of different block types from the block menu
  const handleSelectBlock = (type, attributes = {}) => {
    if (!editor) return;

    // Delete the slash ("/") from the content
    editor.commands.deleteRange({
      from: editor.state.selection.from - 1,
      to: editor.state.selection.from,
    });

    // Handle different block types
    switch (type) {
      case "heading": {
        editor.chain().focus().toggleHeading(attributes).run();
        break;
      }
      case "bulletList": {
        editor
          .chain()
          .focus()
          .deleteRange({
            from: editor.state.selection.from - 1,
            to: editor.state.selection.from,
          })
          .toggleBulletList()
          .insertContent(" ") // Add a space after the bullet
          .run();
        break;
      }
      case "image": {
        const url = prompt("Enter image URL");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
      }
      case "bold": {
        editor.chain().focus().toggleBold().run();
        break;
      }
      case "italic": {
        editor.chain().focus().toggleItalic().run();
        break;
      }
      case "imageWithText": {
        const url = prompt("Enter image URL");
        if (url) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "imageWithText",
              attrs: { src: url, alt: "Image" },
            })
            .run();
        }
        break;
      }
      case "resizableImageWithText": {
        const url = prompt("Enter image URL");
        if (url) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "resizableImageWithText",
              attrs: { src: url, alt: "Image", width: "50%" },
            })
            .run();
        }
        break;
      }
      default:
        break;
    }

    setShowMenu(false); // Hide the block menu after selection
  };

  // Render function for the Write component
  return (
    <div className="max-w-3xl mx-auto p-8 font-sans text-gray-800 relative">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create a New Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title input field */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
          className="p-3 text-xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Inline styles to modify the editor's appearance */}
        <style>{`
          .ProseMirror {
            li p {
              margin: 0;
            }
            
            ul {
              margin-top: 0.5em;
              margin-bottom: 0.5em;
            }
          }
        `}</style>

        {/* Editor container with optional block menu */}
        <div className="relative">
          <div className="p-4 min-h-[300px] border border-gray-300 rounded-lg shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-transparent">
            <EditorContent editor={editor} />
          </div>
          {showMenu && (
            <BlockMenu
              position={menuPosition}
              onSelectBlock={handleSelectBlock}
            />
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="py-2 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Write;
