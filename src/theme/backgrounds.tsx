import car1 from "./photos/car-1.jpg";
import car2 from "./photos/car-2.jpg";
import cat1 from "./photos/cat-1.jpg";
import dog1 from "./photos/dog-1.jpg";


type bg = {
    id: number;
    group: "gradients"|'photos';
    content: string;
  };
  
const backgrounds: {
    photos: bg[];
    gradients: bg[];
  } = {
    photos: [
      { id: 0, group: "photos", content: car1 },
      { id: 1, group: "photos", content: car1 },
      { id: 2, group: "photos", content: cat1 },
      { id: 3, group: "photos", content: dog1 },

      { id: 4, group: "photos", content: cat1 },
      { id: 5, group: "photos", content: car1 },
      { id: 6, group: "photos", content: dog1 },
      { id: 7, group: "photos", content: car1 },

      { id: 8, group: "photos", content: cat1 },
      { id: 9, group: "photos", content: car2 },
      { id: 10, group: "photos", content: dog1 },
      { id: 11, group: "photos", content: car1 },

      { id: 12, group: "photos", content: dog1 },
      { id: 13, group: "photos", content: car1 },
      { id: 14, group: "photos", content: cat1 },
      { id: 15, group: "photos", content: car2 },
      
      { id: 16, group: "photos", content: cat1 },
      { id: 17, group: "photos", content: car2 },
      { id: 18, group: "photos", content: dog1 },
      { id: 19, group: "photos", content: car1 },
    ],
    gradients: [
      { id: 0, group: "gradients", content: "linear-gradient(211deg, #1E90FF, #9aeccd)" },
      { id: 1, group: "gradients", content: "linear-gradient(225deg, #0f57a0, #b22075)" },
      { id: 2, group: "gradients", content: "linear-gradient(45deg, #FF8C00, #FF1493)" },
      { id: 3, group: "gradients", content: "linear-gradient(135deg, #27496e, #20B2AA)" },
      { id: 4, group: "gradients", content: "linear-gradient(222deg, #FF6347, #7FFFD4)" },
      { id: 5, group: "gradients", content: "linear-gradient(157deg, #FF4500, #32CD32)" },
      { id: 6, group: "gradients", content: "linear-gradient(120deg, #6A5ACD, #FFD700)" },
      { id: 7, group: "gradients", content: "linear-gradient(60deg, #800080, #c185df)" },
      { id: 8, group: "gradients", content: "linear-gradient(13deg, #4169E1, #FF69B4)" },
      { id: 9, group: "gradients", content: "linear-gradient(280deg, #2E8B57, #FFD700)" },
      { id: 10, group: "gradients", content: "linear-gradient(320deg, #FF0000, #FF8C00)" },
      { id: 11, group: "gradients", content: "linear-gradient(177deg, #FF1493, #FF4500)" },
      { id: 12, group: "gradients", content: "linear-gradient(189deg, #8A2BE2, #bdc7e4)" },
      { id: 13, group: "gradients", content: "linear-gradient(323deg, #FF6347, #800080)" },
      { id: 14, group: "gradients", content: "linear-gradient(272deg, #32CD32, #00FFFF)" },
      { id: 15, group: "gradients", content: "linear-gradient(310deg, #FF8C00, #FF1493)" },
      { id: 16, group: "gradients", content: "linear-gradient(45deg, #FF6347, #7FFFD4)" },
      { id: 17, group: "gradients", content: "linear-gradient(197deg, #FF4500, #32CD32)" },
      { id: 18, group: "gradients", content: "linear-gradient(100deg, #6A5ACD, #FFD700)" },
      { id: 19, group: "gradients", content: "linear-gradient(20deg, #c79c0e, #cc3258)" },
    ],
  };

  export default backgrounds