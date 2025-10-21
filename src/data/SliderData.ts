// src/data/SliderData.ts
import banner1 from "@/assets/sliderdata/Banner1.png";
import banner2 from "@/assets/sliderdata/Banner2.png";
import banner3 from "@/assets/sliderdata/Banner3.png";
import banner4 from "@/assets/sliderdata/Banner4.png";
import banner5 from "@/assets/sliderdata/Banner5.png";

export interface Banner {
  id: number;
  image: string;
  alt: string;
}

export const banners: Banner[] = [
  { id: 1, image: banner1, alt: "Promo Cashback" },
  { id: 2, image: banner2, alt: "Diskon Pulsa" },
  { id: 3, image: banner3, alt: "Promo Internet" },
  { id: 4, image: banner4, alt: "Tagihan Hemat" },
  { id: 5, image: banner5, alt: "Tagihan Hemat" },
];
