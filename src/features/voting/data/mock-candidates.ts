import type { Candidate } from "@/features/voting/types";
import etim from "@/assets/woman_1.webp";
import mfon from "@/assets/woman_2.webp";
import edima from "@/assets/woman_3.webp";
import nse from "@/assets/woman_4.webp";
import idara from "@/assets/woman_5.webp";
import patience from "@/assets/woman_6.webp";
import blessing from "@/assets/woman-2-hero.webp";
import victoria from "@/assets/mbopo-hero-local-hair.webp";
import stageShot from "@/assets/mbopo-hero-1.webp";
import groupShot from "@/assets/hero-bg.webp";

export const AKWA_IBOM_LGAS = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
] as const;

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "blessing-etim",
    number: 1,
    name: "Blessing Etim",
    lga: "Uyo",
    tagline: "Culture advocate and community storyteller",
    photo: etim,
    gallery: [stageShot, groupShot],
    videoUrls: ["https://www.youtube.com/embed/ScMzIvxBSi4"],
    story: [
      "Blessing Etim has spent years nurturing cultural storytelling through creative community work, bringing local history and aspiration closer to young people across the state.",
      "She is known for a practical approach to public engagement, balancing heritage, innovation, and the everyday realities of community life. Her work continues to bring attention to arts, culture, and the role youth leadership can play in tourism and civic pride.",
    ],
    voteCount: 12840,
    publicVoteWeightPercent: 10,
  },
  {
    id: "mfon-essien",
    number: 2,
    name: "Mfon Essien",
    lga: "Eket",
    tagline: "Heritage tourism ambassador",
    photo: mfon,
    gallery: [groupShot],
    story: [
      "Mfon Essien grew up along the Eket coastline and has made it her mission to introduce visitors to the state's waterways, markets, and living traditions.",
      "She volunteers as a guide during cultural festivals and mentors teenage girls in hospitality and public speaking.",
    ],
    voteCount: 10120,
    publicVoteWeightPercent: 10,
  },
  {
    id: "edima-udoh",
    number: 3,
    name: "Edima Udoh",
    lga: "Ikot Ekpene",
    tagline: "Master weaver and raffia-craft champion",
    photo: edima,
    gallery: [stageShot],
    story: [
      "Ikot Ekpene is celebrated as the Raffia City, and Edima Udoh carries that legacy into a new generation of designers.",
      "Through her cooperative, more than forty young women now earn a living from traditional craft sold to visitors and boutiques across Nigeria.",
    ],
    voteCount: 9730,
    publicVoteWeightPercent: 10,
  },
  {
    id: "nse-udoh",
    number: 4,
    name: "Nse Udoh",
    lga: "Uruan",
    tagline: "Youth educator and environmental volunteer",
    photo: nse,
    story: [
      "Nse Udoh teaches primary school pupils in Uruan and leads weekend clean-up drives along the riverbanks.",
      "She believes tourism begins with pride in place, and designs lessons that connect children to the stories of their own communities.",
    ],
    voteCount: 8765,
    publicVoteWeightPercent: 10,
  },
  {
    id: "idara-bassey",
    number: 5,
    name: "Idara Bassey",
    lga: "Oron",
    tagline: "Maritime heritage storyteller",
    photo: idara,
    gallery: [groupShot],
    story: [
      "Idara Bassey is passionate about the Oron Museum's collections and the seafaring history of her people.",
      "She hosts a popular community radio segment that retells local legends and invites listeners to visit the places behind them.",
    ],
    voteCount: 10980,
    publicVoteWeightPercent: 10,
  },
  {
    id: "patience-okon",
    number: 6,
    name: "Patience Okon",
    lga: "Ibeno",
    tagline: "Coastal conservation advocate",
    photo: patience,
    story: [
      "Patience Okon works with fishing families in Ibeno to protect the beaches that draw visitors to the state's coast.",
      "Her campaigns pair conservation with small-business training so that tourism income stays within the community.",
    ],
    voteCount: 9420,
    publicVoteWeightPercent: 10,
  },
  {
    id: "blessing-ikpe",
    number: 7,
    name: "Blessing Ikpe",
    lga: "Etinan",
    tagline: "Fashion designer reimagining Ibibio attire",
    photo: blessing,
    gallery: [stageShot],
    story: [
      "Blessing Ikpe blends traditional beadwork and fabrics with contemporary cuts, showing Ibibio attire on runways well beyond the state.",
      "She hopes the Mbopo platform will inspire more young designers to build careers at home.",
    ],
    voteCount: 9150,
    publicVoteWeightPercent: 10,
  },
  {
    id: "victoria-okon",
    number: 8,
    name: "Victoria Okon",
    lga: "Mkpat Enin",
    tagline: "Dance and performing arts coach",
    photo: victoria,
    gallery: [groupShot],
    story: [
      "Victoria Okon coaches a youth dance troupe that performs traditional Akwa Ibom dances at festivals and weddings.",
      "She sees performance as a living archive, keeping rhythms and costumes alive for the next generation.",
    ],
    voteCount: 8890,
    publicVoteWeightPercent: 10,
  },
];
