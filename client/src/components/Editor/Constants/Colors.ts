interface Color {
  light: string
  dark: string
}

const colors: Array<Color> = [
  {
    light: "#f28b82",
    dark: "#5c2b29",
  },
  {
    light: "#fbbc04",
    dark: "#614a19",
  },
  {
    light: "#fff475",
    dark: "#635d19",
  },
  {
    light: "#ccff90",
    dark: "#345920",
  },
  {
    light: "#a7ffeb",
    dark: "#16504b",
  },
  {
    light: "#cbf0f8",
    dark: "#2d555e",
  },
  {
    light: "#aecbfa",
    dark: "#1e3a5f",
  },
  {
    light: "#d7aefb",
    dark: "#42275e",
  },
  {
    light: "#fdcfe8",
    dark: "#5b2245",
  },
  {
    light: "#e6c9a8",
    dark: "#442f19",
  },
  {
    light: "#e8eaed",
    dark: "#3c3f43",
  },
]

const colorCalc = (noteColor: string) => {
  for (var i = 0; i < colors.length; ++i) {
    if (noteColor === colors[i].light) {
      return colors[i]
    }
  }
  return colors[colors.length - 1]
}
export type { Color }
export { colors, colorCalc }
