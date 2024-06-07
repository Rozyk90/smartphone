declare module '*.png' {
    const value: any;
    export = value;
  }

  declare module '*.jpg';
  declare module '*.jpeg';

  declare module '*.mp3' {
    const src: string;
    export default src;
  }