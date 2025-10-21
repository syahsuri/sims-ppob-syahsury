import pbbIcon from "@/assets/featuresdata/PBB.png";
import listrikIcon from "@/assets/featuresdata/Listrik.png";
import pulsaIcon from "@/assets/featuresdata/Pulsa.png";
import pdamIcon from "@/assets/featuresdata/PDAM.png";
import pgnIcon from "@/assets/featuresdata/PGN.png";
import tvIcon from "@/assets/featuresdata/Televisi.png";
import musikIcon from "@/assets/featuresdata/Musik.png";
import gameIcon from "@/assets/featuresdata/Game.png";
import makanIcon from "@/assets/featuresdata/VoucherMakanan.png";
import kurbanIcon from "@/assets/featuresdata/Kurban.png";
import zakatIcon from "@/assets/featuresdata/Zakat.png";
import dataIcon from "@/assets/featuresdata/PaketData.png";

export interface Feature {
  name: string;
  icon: string;
}

export const features: Feature[] = [
  { name: "PBB", icon: pbbIcon },
  { name: "Listrik", icon: listrikIcon },
  { name: "Pulsa", icon: pulsaIcon },
  { name: "PDAM", icon: pdamIcon },
  { name: "PGN", icon: pgnIcon },
  { name: "TV Langganan", icon: tvIcon },
  { name: "Musik", icon: musikIcon },
  { name: "Voucher Game", icon: gameIcon },
  { name: "Voucher Makanan", icon: makanIcon },
  { name: "Kurban", icon: kurbanIcon },
  { name: "Zakat", icon: zakatIcon },
  { name: "Paket Data", icon: dataIcon },
];
