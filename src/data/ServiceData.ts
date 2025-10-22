import pbbIcon from "@/assets/service-icon/PBB.png";
import listrikIcon from "@/assets/service-icon/Listrik.png";
import pulsaIcon from "@/assets/service-icon/Pulsa.png";
import pdamIcon from "@/assets/service-icon/PDAM.png";
import pgnIcon from "@/assets/service-icon/PGN.png";
import tvIcon from "@/assets/service-icon/Televisi.png";
import musikIcon from "@/assets/service-icon/Musik.png";
import gameIcon from "@/assets/service-icon/Game.png";
import makanIcon from "@/assets/service-icon/VoucherMakanan.png";
import kurbanIcon from "@/assets/service-icon/Kurban.png";
import zakatIcon from "@/assets/service-icon/Zakat.png";
import dataIcon from "@/assets/service-icon/PaketData.png";

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
