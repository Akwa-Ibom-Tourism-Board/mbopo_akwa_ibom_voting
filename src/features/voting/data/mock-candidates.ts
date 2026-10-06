import type { Candidate } from "@/features/voting/types";

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
    id: "ada-ayo",
    name: "Ada Ayo",
    lga: "Uyo",
    tagline: "Culture advocate and community storyteller",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrls: ["https://www.youtube.com/embed/ScMzIvxBSi4"],
    story: [
      "Ada Ayo has spent years nurturing cultural storytelling through creative community work, bringing local history and aspiration closer to young people across the state.",
      "She is known for her practical approach to public engagement, balancing heritage, innovation, and the everyday realities of community life. Her work continues to bring attention to arts, culture, and the role youth leadership can play in tourism and civic pride.",
    ],
    voteCount: 12840,
    publicVoteWeightPercent: 10,
  },
  {
    id: "mfon-essien",
    name: "Mfon Essien",
    lga: "Eket",
    tagline: "Hospitality champion and destination builder",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    ],
    story: [
      "Mfon Essien has built a brand around hospitality, guest experience, and authentic local welcome, helping the state present itself more confidently as a destination of choice.",
      "Her public work emphasizes collaboration, service quality, and destination storytelling that connects local communities with tourism growth."
    ],
    voteCount: 10120,
    publicVoteWeightPercent: 10,
  },
  {
    id: "samuel-emem",
    name: "Samuel Emem",
    lga: "Ikot Ekpene",
    tagline: "Creative entrepreneur and local pride advocate",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
    ],
    story: [
      "Samuel Emem brings together business energy and community connection in a way that makes cultural heritage feel both contemporary and deeply relevant.",
      "He has supported community-driven events and creative partnerships, helping local ideas gain wider visibility while keeping the state rooted in pride and authenticity.",
    ],
    voteCount: 11650,
    publicVoteWeightPercent: 10,
  },
  {
    id: "ifeoma-udoh",
    name: "Ifeoma Udoh",
    lga: "Uruan",
    tagline: "Tourism advocate with a community-first approach",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    story: [
      "Ifeoma Udoh has become a familiar voice for local tourism visibility, advocating for communities, artisans, and destinations that deserve more recognition.",
      "Her work reflects a belief that tourism should bring tangible benefits to local life while preserving the character and values of each place.",
    ],
    voteCount: 9730,
    publicVoteWeightPercent: 10,
  },
  {
    id: "nse-udoh",
    name: "Nse Udoh",
    lga: "Oron",
    tagline: "Cultural curator and youth mentor",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    ],
    story: [
      "Nse Udoh has been active in youth culture programming, linking creative expression, identity, and regional pride in a way that speaks directly to the future of tourism and civic confidence.",
      "Her work brings the richness of local culture into public conversation and helps position communities as active contributors to the state's story.",
    ],
    voteCount: 8765,
    publicVoteWeightPercent: 10,
  },
  {
    id: "eko-bassey",
    name: "Eko Bassey",
    lga: "Ibeno",
    tagline: "Coastal experience promoter",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    story: [
      "Eko Bassey champions the unique appeal of the state's coastline, bringing attention to how natural beauty, local culture, and hospitality can work together to create a memorable destination identity.",
      "His platform centers on desire, discovery, and destination value while remaining rooted in practical local partnerships and community benefit.",
    ],
    voteCount: 10980,
    publicVoteWeightPercent: 10,
  },
  {
    id: "patience-okon",
    name: "Patience Okon",
    lga: "Etinan",
    tagline: "Arts and heritage advocate",
    photo:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    story: [
      "Patience Okon has become a strong voice for arts, storytelling, and community heritage, helping the state communicate its identity with warmth and confidence.",
      "Her public work focuses on elevating local creatives and ensuring visitors understand the deeper stories behind the places they visit.",
    ],
    voteCount: 9420,
    publicVoteWeightPercent: 10,
  },
  {
    id: "daniel-udo",
    name: "Daniel Udo",
    lga: "Mkpat Enin",
    tagline: "Destination strategist and community connector",
    photo:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    ],
    story: [
      "Daniel Udo has championed a more strategic view of tourism and economic opportunity, helping connect local communities to clearer pathways for growth and recognition.",
      "His work focuses on practical partnerships and sustainable visibility that can help strengthen the state's profile across the region.",
    ],
    voteCount: 13320,
    publicVoteWeightPercent: 10,
  },
  {
    id: "blessing-ikpe",
    name: "Blessing Ikpe",
    lga: "Abak",
    tagline: "Local enterprise leader",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    story: [
      "Blessing Ikpe has been widely recognized for her role in promoting small business visibility, local pride, and destination narratives that celebrate community ownership.",
      "Her leadership approach is rooted in practical action, making sure growing tourism opportunities remain tied to local benefit and cultural integrity.",
    ],
    voteCount: 9150,
    publicVoteWeightPercent: 10,
  },
  {
    id: "kingsley-nsa",
    name: "Kingsley Nsa",
    lga: "Ikono",
    tagline: "Sustainable tourism advocate",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    story: [
      "Kingsley Nsa is committed to building a tourism story that is sustainable, community-led, and rooted in the authentic qualities that make Akwa Ibom distinct.",
      "He believes destination branding should help local communities thrive while showcasing the state's natural beauty and cultural richness to the wider public.",
    ],
    voteCount: 10440,
    publicVoteWeightPercent: 10,
  },
  {
    id: "victoria-okon",
    name: "Victoria Okon",
    lga: "Nsit Ubium",
    tagline: "Heritage custodian and public voice",
    photo:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=900&q=80",
    story: [
      "Victoria Okon is known for her calm but compelling leadership style and her commitment to making local heritage and tourism narratives more visible.",
      "Her work brings together respect for tradition and the energy needed to present the state as a destination with depth, texture, and opportunity.",
    ],
    voteCount: 8890,
    publicVoteWeightPercent: 10,
  },
  {
    id: "uche-udofia",
    name: "Uche Udofia",
    lga: "Uyo",
    tagline: "Public engagement and destination storytelling leader",
    photo:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    ],
    story: [
      "Uche Udofia has made a mark through consistent community engagement and a strong belief that tourism should be both aspirational and deeply connected to local life.",
      "By amplifying community voices and promoting locally grounded experiences, he continues to strengthen the state's appeal as a vibrant destination with room for growth.",
    ],
    voteCount: 12110,
    publicVoteWeightPercent: 10,
  },
];
