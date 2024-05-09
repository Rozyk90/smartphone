enum enumTheme {
  themeBasic = "basicTheme",
  themeBlackWhite = "blackWhite",
}

const themeBase = {
  [enumTheme.themeBasic]: {
    dark: {
      primary: "#367aff",
      onPrimary: "#fcfcfc",
      success: "#15a75c",
      onSuccess: "fcfcfc",
      declain: "#e03c34",
      onDeclain: "#fcfcfc",
      white: "#fcfcfc",
      black: "#4a4a4a",
      backgrounds: {
        primary: "#202020",
        secondary: "#272727",
        other: "#121212",
      },
      fonts: {
        primary: "#f5f5f5",
        secondary: "#929292",
      },
    },

    light: {
      primary: "#367aff",
      onPrimary: "#fcfcfc",
      success: "#15a75c",
      onSuccess: "fcfcfc",
      declain: "#e03c34",
      onDeclain: "#fcfcfc",
      white: "#fcfcfc",
      black: "#4a4a4a",
      backgrounds: {
        primary: "#f5f5f5",
        secondary: "#fcfcfc",
        other: "#9b9a9f",
      },
      fonts: {
        primary: "#202020",
        secondary: "#6b6a6f",
      },
    },
  },

  [enumTheme.themeBlackWhite]: {
    dark: {
      background: "green",
    },
    light: {
      background: "green",
    },
  },
};

export default themeBase;

export { enumTheme };
