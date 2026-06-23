export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  type: "Beginning" | "Milestone" | "Community" | "Achievement";
}

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    title: "A shared idea took root",
    description:
      "Sabooj Maroon Club began with a simple promise: to create a generous space for culture, friendship and service.",
    type: "Beginning",
  },
  {
    year: "2020",
    title: "Neighbours became a community",
    description:
      "Our first member-led programs brought families together through small acts of care and connection.",
    type: "Community",
  },
  {
    year: "2021",
    title: "The cultural calendar grew",
    description:
      "Music, theatre, art and seasonal celebrations became a vibrant part of the club's annual rhythm.",
    type: "Milestone",
  },
  {
    year: "2022",
    title: "Service moved beyond our walls",
    description:
      "Health, education and neighbourhood initiatives expanded the club's contribution to the wider community.",
    type: "Community",
  },
  {
    
  year: "2023",
  title: "Strengthening a Legacy of Excellence",
  description:
    "With unwavering dedication, the organization continued to elevate its mission, enriching cultural engagement and inspiring the community through tradition, innovation, and collective effort.",
  type: "Achievement"

  },
  {
    year: "2024",
    title: "Six years, one enduring spirit",
    description:
      "We marked our Sixth year by celebrating every volunteer, artist, neighbour and member who shaped the journey.",
    type: "Achievement",
  },
  {
    year: "2025",
    title: "The story continues",
    description:
      "New collaborations and community programs are opening the next chapter of Sabooj Maroon Club.",
    type: "Milestone",
  },
  {
  year: "2026",
  title: "A Legacy Reimagined",
  description:
    "Honoring its rich heritage while embracing modern aspirations, the organization continued to inspire generations through meaningful cultural initiatives and community engagement.",
  type: "Achievement"
}
];
