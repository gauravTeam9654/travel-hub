export { arunachalPackages, gangtokPackages, meghalayaPackages, darjeelingPackages } from "./tourpackages";

import { bhutanPackages as bhutanPackagesFull } from "./tourpackages";

export const bhutanPackages = bhutanPackagesFull.map(pkg => ({
  image: pkg.image,
  title: pkg.title,
  subtitle: pkg.subtitle,
  slug: pkg.slug,
  days: pkg.days,
  price: pkg.price,
  description: pkg.description
}));


export const sikkimPackages = [
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80", 
    title: "Sikkim & Darjeeling Delight 7-Day Himalayan Retreat",
    subtitle: "Tour Packages",
    slug: "sikkim-darjeeling-delight-7-day-himalayan-retreat"
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Enchanting Sikkim 4-Day Himalayan Escape",
    subtitle: "Tour Packages",
    slug: "enchanting-sikkim-4-day-himalayan-escape"
  },
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80", 
    title: "Mystical Himalayan Adventure – 10 Days",
    subtitle: "Tour Packages",
    slug: "mystical-himalayan-adventure-10-days"
  },
  {
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80", 
    title: "Gurudongmar Lake & North Sikkim 5N/6D",
    subtitle: "Tour Packages",
    slug: "gurudongmar-lake-north-sikkim-5n-6d"
  },
  {
    image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=600&q=80", 
    title: "Sikkim Valley Explorer 6-Day Tour",
    subtitle: "Tour Packages",
    slug: "sikkim-valley-explorer-6-day-tour"
  },
  {
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80", 
    title: "Adventure in Sikkim – 7 Days",
    subtitle: "Tour Packages",
    slug: "adventure-in-sikkim-7-days"
  },
];
