enum enumTheme {
  themeBasic = "basicTheme",
  themeRed = "themeRed",
  themeGreen = "themeGreen",
  themeBlue = "themeBlue",
  themeOrange = "themeOrange",
  themePurple = "themePurple",
  themePink = "themePink",
  themeTeal = "themeTeal",
  themeCyan = "themeCyan",
  themeLime = "themeLime",
  themeSeafoam = "themeSeafoam",
}

const colors = {
  [enumTheme.themeBasic]: {
    name: enumTheme.themeBasic,
    primary: "#1f50b3",
    onPrimary: "#fcfcfc",
    background: "#cbdaec",
    darkBackground: "#182844",
  },
  [enumTheme.themeRed]: {
    name: enumTheme.themeRed,
    primary: "#ff0000",
    onPrimary: "#fcfcfc",
    background: "#ffe5e5",
    darkBackground: "#330000",
  },
  [enumTheme.themeGreen]: {
    name: enumTheme.themeGreen,
    primary: "#00ff00",
    onPrimary: "#fcfcfc",
    background: "#e5ffe5",
    darkBackground: "#003300",
  },
  [enumTheme.themeBlue]: {
    name: enumTheme.themeBlue,
    primary: "#0000ff",
    onPrimary: "#fcfcfc",
    background: "#e5e5ff",
    darkBackground: "#000033",
  },
  [enumTheme.themeOrange]: {
    name: enumTheme.themeOrange,
    primary: "#ffa500",
    onPrimary: "#fcfcfc",
    background: "#ffecd1",
    darkBackground: "#332200",
  },
  [enumTheme.themePurple]: {
    name: enumTheme.themePurple,
    primary: "#800080",
    onPrimary: "#fcfcfc",
    background: "#f0e5ff",
    darkBackground: "#220022",
  },
  [enumTheme.themePink]: {
    name: enumTheme.themePink,
    primary: "#ffc0cb",
    onPrimary: "#fcfcfc",
    background: "#ffe5f0",
    darkBackground: "#33111A",
  },
  [enumTheme.themeTeal]: {
    name: enumTheme.themeTeal,
    primary: "#008080",
    onPrimary: "#fcfcfc",
    background: "#e5ffff",
    darkBackground: "#002222",
  },
  [enumTheme.themeCyan]: {
    name: enumTheme.themeCyan,
    primary: "#00ffff",
    onPrimary: "#fcfcfc",
    background: "#e5ffff",
    darkBackground: "#003333",
  },
  [enumTheme.themeLime]: {
    name: enumTheme.themeLime,
    primary: "#00ff00",
    onPrimary: "#fcfcfc",
    background: "#f0ffe5",
    darkBackground: "#003300",
  },
  [enumTheme.themeSeafoam]: {
    name: enumTheme.themeSeafoam,
    primary: "#2E8B57",
    onPrimary: "#FFFFFF",
    background: "#F0FFFF",
    darkBackground: "#1A3322",
  },
};

const darkModeTheme = {
  success: "#15a75c",
  onSuccess: "#ffffff",
  declain: "#e03c34",
  onDeclain: "#ffffff",
  off: "#808080",
  white: "#ffffff",
  black: "#000000",
  backgrounds: {
    primary: "#181818",
    off: "#1b1b1b",
    medium: "#303030",
    light: "#424242",
  },
  fonts: {
    primary: "#ffffff",
    secondary: "#c0c0c0",
  },
};

const lightModeTheme = {
  success: "#15a75c",
  onSuccess: "#fcfcfc",
  declain: "#e03c34",
  onDeclain: "#fcfcfc",
  off: "#5a5a5a",
  onOff: "#b1b1b1",
  white: "#fcfcfc",
  black: "#4a4a4a",
  backgrounds: {
    primary: "#f5f5f5",
    off: "#1b1b1b",
    medium: "#a8a8a8f5",
    light: "#e0e0e0",
  },
  fonts: {
    primary: "#202020",
    secondary: "#6b6a6f",
  },
};

export { darkModeTheme, lightModeTheme, colors, enumTheme };
