export type GalleryCategory = "Culture" | "Community" | "Celebrations";

export interface GalleryItem {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
  alt: string;
  aspect: "portrait" | "landscape" | "wide";
  position?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "SABOOJ MAROON SANGHA",
    category: "Culture",
    image: "/about/about-club.png",
    alt: "SABOOJ MAROON SANGHA club PREMISES",
    aspect: "wide",
  },
  {
    id: 2,
    title: "Rhythms of Home",
    category: "Culture",
    image: "/gallery/PUJO.png",
    alt: "Saraswati Pujo at our club",
    aspect: "landscape",
  },
  {
    id: 3,
    title: "Light, Made Together",
    category: "Celebrations",
    image: "/gallery/Maa.png",
    alt: "A moment of devotion beneath the graceful presence of Maa Saraswati.",
    aspect: "portrait",
  },
  {
    id: 4,
    title: "Poise in Motion",
    category: "Celebrations",
    image: "/gallery/visarjan.jpeg",
    alt: "A classical dancer performing in a heritage courtyard",
    aspect: "portrait",
  },
  {
    id: 5,
    title: "The backbone of Sabooj Maroon Sangha",
    category: "Community",
    image: "/gallery/members.jpeg",
    alt: "Core Members",
    aspect: "portrait",
    position: "70% center",
  },
  
];
