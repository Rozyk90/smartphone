import p0 from "./photos/p0.jpeg";
import p1 from "./photos/p1.jpeg";
import p2 from "./photos/p2.jpeg";
import p3 from "./photos/p3.jpeg";
import p4 from "./photos/p4.jpeg";
import p5 from "./photos/p5.jpeg";
import p6 from "./photos/p6.jpeg";
import p7 from "./photos/p7.jpeg";
import p8 from "./photos/p8.jpeg";
import p9 from "./photos/p9.jpeg";
import p10 from "./photos/p10.jpeg";
import p11 from "./photos/p11.jpeg";
import p12 from "./photos/p12.jpeg";
import p13 from "./photos/p13.jpeg";
import p14 from "./photos/p14.jpeg";
import p15 from "./photos/p15.jpeg";
import p16 from "./photos/p16.jpeg";
import p17 from "./photos/p17.jpeg";
import p18 from "./photos/p18.jpeg";
import p19 from "./photos/p19.jpeg";

type bg = {
  id: number;
  group: "gradients" | "photos";
  content: string;
};

const backgrounds: {
  photos: bg[];
  gradients: bg[];
} = {
  photos: [
    { id: 0, group: "photos", content: p0 },
    { id: 1, group: "photos", content: p1 },
    { id: 2, group: "photos", content: p2 },
    { id: 3, group: "photos", content: p3 },
    { id: 4, group: "photos", content: p4 },
    { id: 5, group: "photos", content: p5 },
    { id: 6, group: "photos", content: p6 },
    { id: 7, group: "photos", content: p7 },
    { id: 8, group: "photos", content: p8 },
    { id: 9, group: "photos", content: p9 },
    { id: 10, group: "photos", content: p10 },
    { id: 11, group: "photos", content: p11 },
    { id: 12, group: "photos", content: p12 },
    { id: 13, group: "photos", content: p13 },
    { id: 14, group: "photos", content: p14 },
    { id: 15, group: "photos", content: p15 },
    { id: 16, group: "photos", content: p16 },
    { id: 17, group: "photos", content: p17 },
    { id: 18, group: "photos", content: p18 },
    { id: 19, group: "photos", content: p19 },
  ],
  gradients: [
    {
      id: 0,
      group: "gradients",
      content: "linear-gradient(211deg, #1E90FF, #9aeccd)",
    },
    {
      id: 1,
      group: "gradients",
      content: "linear-gradient(225deg, #0f57a0, #b22075)",
    },
    {
      id: 2,
      group: "gradients",
      content: "linear-gradient(45deg, #FF8C00, #FF1493)",
    },
    {
      id: 3,
      group: "gradients",
      content: "linear-gradient(135deg, #27496e, #20B2AA)",
    },
    {
      id: 4,
      group: "gradients",
      content: "linear-gradient(222deg, #FF6347, #7FFFD4)",
    },
    {
      id: 5,
      group: "gradients",
      content: "linear-gradient(157deg, #FF4500, #32CD32)",
    },
    {
      id: 6,
      group: "gradients",
      content: "linear-gradient(120deg, #6A5ACD, #FFD700)",
    },
    {
      id: 7,
      group: "gradients",
      content: "linear-gradient(60deg, #800080, #c185df)",
    },
    {
      id: 8,
      group: "gradients",
      content: "linear-gradient(13deg, #4169E1, #FF69B4)",
    },
    {
      id: 9,
      group: "gradients",
      content: "linear-gradient(280deg, #2E8B57, #FFD700)",
    },
    {
      id: 10,
      group: "gradients",
      content: "linear-gradient(320deg, #FF0000, #FF8C00)",
    },
    {
      id: 11,
      group: "gradients",
      content: "linear-gradient(177deg, #FF1493, #FF4500)",
    },
    {
      id: 12,
      group: "gradients",
      content: "linear-gradient(189deg, #8A2BE2, #bdc7e4)",
    },
    {
      id: 13,
      group: "gradients",
      content: "linear-gradient(323deg, #FF6347, #800080)",
    },
    {
      id: 14,
      group: "gradients",
      content: "linear-gradient(272deg, #32CD32, #00FFFF)",
    },
    {
      id: 15,
      group: "gradients",
      content: "linear-gradient(310deg, #FF8C00, #FF1493)",
    },
    {
      id: 16,
      group: "gradients",
      content: "linear-gradient(45deg, #FF6347, #7FFFD4)",
    },
    {
      id: 17,
      group: "gradients",
      content: "linear-gradient(197deg, #FF4500, #32CD32)",
    },
    {
      id: 18,
      group: "gradients",
      content: "linear-gradient(100deg, #6A5ACD, #FFD700)",
    },
    {
      id: 19,
      group: "gradients",
      content: "linear-gradient(20deg, #c79c0e, #cc3258)",
    },
  ],
};

export default backgrounds;
