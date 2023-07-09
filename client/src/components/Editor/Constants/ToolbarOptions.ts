interface formatType {
  className: string
  options?: Array<string>
  value?: string
  collapse: string
}

const colors = ["red", "green", "blue", "orange", "violet"]
const formats: Array<formatType> = [
  {
    className: "ql-font",
    options: ["serif", "monospace"],
    collapse: "medium",
  },
  {
    className: "ql-size",
    options: ["small", "large", "huge"],
    collapse: "medium",
  },

  { className: "ql-bold", collapse: "never" },
  { className: "ql-italic", collapse: "never" },
  { className: "ql-underline", collapse: "never" },
  { className: "ql-strike", collapse: "never" },

  {
    className: "ql-color",
    options: colors,
    collapse: "small",
  },
  {
    className: "ql-background",
    options: colors,
    collapse: "small",
  },

  {
    className: "ql-script",
    value: "sub",
    collapse: "never",
  },
  {
    className: "ql-script",
    value: "super",
    collapse: "never",
  },

  {
    className: "ql-header",
    value: "1",
    collapse: "medium",
  },
  {
    className: "ql-header",
    value: "2",
    collapse: "medium",
  },
  {
    className: "ql-blockquote",
    collapse: "medium",
  },
  {
    className: "ql-code-block",
    collapse: "never",
  },

  {
    className: "ql-list",
    value: "ordered",
    collapse: "small",
  },
  {
    className: "ql-list",
    value: "bullet",
    collapse: "small",
  },
  {
    className: "ql-indent",
    value: "-1",
    collapse: "medium",
  },
  {
    className: "ql-indent",
    value: "+1",
    collapse: "medium",
  },

  {
    className: "ql-align",
    options: ["right", "center", "justify"],
    collapse: "never",
  },

  { className: "ql-link", collapse: "medium" },
  { className: "ql-image", collapse: "medium" },
  { className: "ql-formula", collapse: "medium" },
]

export default formats
export type { formatType }
