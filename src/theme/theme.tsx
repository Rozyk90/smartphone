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
    primary: "#367aff",
    onPrimary: "#fcfcfc",
    background: "#698ebb",
  },
  [enumTheme.themeRed]: {
    name: enumTheme.themeRed,
    primary: "#ff0000",
    onPrimary: "#fcfcfc",
    background: "#ffe5e5",
  },
  [enumTheme.themeGreen]: {
    name: enumTheme.themeGreen,
    primary: "#00ff00",
    onPrimary: "#fcfcfc",
    background: "#e5ffe5",
  },
  [enumTheme.themeBlue]: {
    name: enumTheme.themeBlue,
    primary: "#0000ff",
    onPrimary: "#fcfcfc",
    background: "#e5e5ff",
  },
  [enumTheme.themeOrange]: {
    name: enumTheme.themeOrange,
    primary: "#ffa500",
    onPrimary: "#fcfcfc",
    background: "#ffecd1",
  },
  [enumTheme.themePurple]: {
    name: enumTheme.themePurple,
    primary: "#800080",
    onPrimary: "#fcfcfc",
    background: "#f0e5ff",
  },
  [enumTheme.themePink]: {
    name: enumTheme.themePink,
    primary: "#ffc0cb",
    onPrimary: "#fcfcfc",
    background: "#ffe5f0",
  },
  [enumTheme.themeTeal]: {
    name: enumTheme.themeTeal,
    primary: "#008080",
    onPrimary: "#fcfcfc",
    background: "#e5ffff",
  },
  [enumTheme.themeCyan]: {
    name: enumTheme.themeCyan,
    primary: "#00ffff",
    onPrimary: "#fcfcfc",
    background: "#e5ffff",
  },
  [enumTheme.themeLime]: {
    name: enumTheme.themeLime,
    primary: "#00ff00",
    onPrimary: "#fcfcfc",
    background: "#f0ffe5",
  },
  [enumTheme.themeSeafoam]: {
    name: enumTheme.themeSeafoam,
    primary: "#2E8B57",
    onPrimary: "#FFFFFF",
    background: "#F0FFFF",
  },
};

const darkModeTheme = {
  success: "#15a75c",
  onSuccess: "#fcfcfc",
  declain: "#e03c34",
  onDeclain: "#fcfcfc",
  off: "#5a5a5a",
  onOff: "#b1b1b1",
  white: "#fcfcfc",
  black: "#4a4a4a",
  backgrounds: {
    primary: "#202020",
    off: "#1b1b1b",
     medium:'#414040f5',
    light:'#525252'
  },
  fonts: {
    primary: "#f5f5f5",
    secondary: "#929292",
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
    medium:'#a8a8a8f5',
    light:'#e0e0e0'

  },
  fonts: {
    primary: "#202020",
    secondary: "#6b6a6f",
  },
};

export { darkModeTheme, lightModeTheme, colors, enumTheme };
