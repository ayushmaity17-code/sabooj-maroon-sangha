export interface ClubEvent {
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  featured?: boolean;
}

export const events: ClubEvent[] = [
  {
  title: "Saraswati Puja 2026",
  image: "/events/saraswati-main.png",
  date: "January 2026",
  location: "Sabooj Maroon Sangha",
  description:
    "Our annual Saraswati Puja celebration brings together devotion, culture, tradition and community spirit, creating memories that last for generations.",
  featured: true,
}
]