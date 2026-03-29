import React from 'react';

export interface NodeData {
  id: string;
  index: string;
  category: string;
  title: string;
  description: React.ReactNode;
  action: string;
  url: string;
  isVault?: boolean;
  isExpandable?: boolean;
  isCollective?: boolean;
  planet?: PlanetData;
  subBrands?: SubBrand[];
}

export interface SubBrand {
  id: string;
  platform: string;
  name: string;
  description: string;
  url: string;
  color: string;
}

export interface PlanetLink {
  label: string;
  url: string;
  platform?: string;
}

export interface PlanetData {
  sectionLabel: string;
  bio: string;
  links?: PlanetLink[];
  mediaEmbed?: {
    url: string;
    label: string;
  };
  contact?: {
    label: string;
    value: string;
    url?: string;
  };
}

export const NODES: NodeData[] = [
  {
    id: 'the-vault',
    index: '01',
    category: 'PRIMARY NODE',
    title: 'THE VAULT',
    description: <>Core archive. Unreleased material.<br/>Members only.</>,
    action: '→ ENTER',
    url: 'https://mtiradio.substack.com/s/the-vault',
    isVault: true
  },
  {
    id: 'collective',
    index: '02',
    category: 'NETWORK',
    title: 'COLLECTIVE',
    description: <>The network.<br/>The operators.</>,
    action: '→ EXPAND',
    url: '#',
    isExpandable: true,
    isCollective: true,
    subBrands: [
      { id: 'tse', platform: 'YT', name: 'TSE Top Shelf Ent.', description: 'The gold standard of the region. Premium entertainment.', url: 'https://www.youtube.com/@tsetopshelfentertainment2648', color: '#ff0000' },
      { id: 'coc-podcast', platform: 'YT', name: 'COC PODCAST', description: 'Culture. Opinion. Conversation.', url: 'https://www.youtube.com/@COCPodcast614', color: '#ff0000' },
      { id: 'trak-team', platform: 'FB', name: 'TRAK TEAM DJs', description: 'The selectors. The sound.', url: 'https://www.facebook.com/profile.php?id=61576360502116', color: '#1877f2' },
      { id: 'marlanda-dekine', platform: 'SS', name: 'MARLANDA DEKINE', description: 'Words. Soul. Dispatch.', url: 'https://substack.com/@dekinesoul?utm_source=global-search', color: '#ff6719' },
      { id: 'state-of-mynd', platform: 'IG', name: 'STATE OF MYND', description: 'Frequency. Vision. Identity.', url: 'https://www.instagram.com/tqstateofmynd/', color: '#c13584' }
    ]
  },
  {
    id: 'shemuEl-namaste',
    index: '03',
    category: 'ARTIST',
    title: "SHEMU'EL NAMASTE",
    description: <>Frequency. Spirit. Architecture.<br/>The signal within the signal.</>,
    action: '→ TUNE IN',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: "// SHEMU'EL NAMASTE",
      bio: "Shemu'el Namaste is a multidimensional artist, sound architect, and cultural operator moving between music, spirituality, and intentional living. The work is not background — it is transmission.",
      links: [
        { label: 'MTI RADIO — SUBSTACK', url: 'https://mtiradio.substack.com', platform: 'SS' },
        { label: 'INSTAGRAM', url: '#', platform: 'IG' },
        { label: 'YOUTUBE', url: '#', platform: 'YT' },
      ],
      mediaEmbed: {
        url: 'https://www.youtube.com/embed/videoseries?list=PLplaceholder',
        label: 'LATEST TRANSMISSION'
      },
      contact: {
        label: 'DIRECT LINE',
        value: 'BOOKINGS & INQUIRIES',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'akata-visions',
    index: '04',
    category: 'VISUAL',
    title: 'AKATA VISIONS',
    description: <>Direction. Film. Identity.<br/>Moving image.</>,
    action: '→ VIEW',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// VISUAL ARCHIVE',
      bio: 'Akata Visions is the visual arm of the MTI Universe — directing, filming, and architecting the moving image identity of the collective. Every frame is intentional.',
      links: [
        { label: 'YOUTUBE CHANNEL', url: '#', platform: 'YT' },
        { label: 'INSTAGRAM', url: '#', platform: 'IG' },
        { label: 'VIMEO PORTFOLIO', url: '#', platform: 'VM' },
      ],
      mediaEmbed: {
        url: 'https://www.youtube.com/embed/videoseries?list=PLplaceholder',
        label: 'LATEST VISUAL DROP'
      },
      contact: {
        label: 'PRODUCTION INQUIRIES',
        value: 'COMMISSIONS & COLLABS',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'substack',
    index: '05',
    category: 'EDITORIAL',
    title: 'SUBSTACK',
    description: <>Long-form intelligence.<br/>The dispatch.</>,
    action: '→ READ',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// THE DISPATCH',
      bio: 'Long-form intelligence from inside the MTI Universe. Strategy, culture, and signal — delivered directly. No algorithm. No noise. The dispatch arrives when it is ready.',
      links: [
        { label: 'MTI RADIO — SUBSTACK', url: 'https://mtiradio.substack.com', platform: 'SS' },
        { label: 'MARLANDA DEKINE', url: 'https://substack.com/@dekinesoul?utm_source=global-search', platform: 'SS' },
        { label: 'THE VAULT ARCHIVE', url: 'https://mtiradio.substack.com/s/the-vault', platform: 'SS' },
      ],
      contact: {
        label: 'SUBMISSIONS',
        value: 'PITCHES & COLLABS',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'mrktng-lab',
    index: '06',
    category: 'STRATEGY',
    title: 'MRKTNG LAB',
    description: <>Infrastructure. Growth.<br/>System architecture.</>,
    action: '→ BUILD',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// SYSTEM ARCHITECTURE',
      bio: 'displayMRKTNG is the strategic infrastructure behind the MTI Universe. Brand systems, growth architecture, and creative direction for operators who move with intent.',
      links: [
        { label: 'INSTAGRAM', url: '#', platform: 'IG' },
        { label: 'LINKEDIN', url: '#', platform: 'LI' },
        { label: 'PORTFOLIO DECK', url: '#', platform: 'DOC' },
      ],
      contact: {
        label: 'CLIENT INQUIRIES',
        value: 'STRATEGY & BUILD',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'archive',
    index: '07',
    category: 'CATALOG',
    title: 'ARCHIVE',
    description: <>The full body of work.<br/>Indexed. Permanent.</>,
    action: '→ EXPLORE',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// FULL CATALOG',
      bio: 'The permanent record. Every release, project, collaboration, and transmission — indexed and preserved. The archive does not forget.',
      links: [
        { label: 'THE VAULT', url: 'https://mtiradio.substack.com/s/the-vault', platform: 'SS' },
        { label: 'YOUTUBE CATALOG', url: 'https://www.youtube.com/@tsetopshelfentertainment2648', platform: 'YT' },
        { label: 'FULL DISCOGRAPHY', url: '#', platform: 'MUS' },
      ],
      contact: {
        label: 'LICENSING',
        value: 'SYNC & USAGE RIGHTS',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'live',
    index: '08',
    category: 'EVENTS',
    title: 'LIVE',
    description: <>Appearances. Shows.<br/>Presence.</>,
    action: '→ UPCOMING',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// UPCOMING TRANSMISSIONS',
      bio: 'The MTI Universe is not only digital. Live appearances, shows, and activations — presence as practice. Stay locked for upcoming dates.',
      links: [
        { label: 'EVENT CALENDAR', url: '#', platform: 'CAL' },
        { label: 'INSTAGRAM UPDATES', url: 'https://www.instagram.com/tqstateofmynd/', platform: 'IG' },
        { label: 'BOOK FOR EVENTS', url: 'mailto:contact@ageold.shop', platform: 'EMAIL' },
      ],
      contact: {
        label: 'BOOKING',
        value: 'SHOWS & APPEARANCES',
        url: 'mailto:contact@ageold.shop'
      }
    }
  },
  {
    id: 'shop',
    index: '09',
    category: 'OBJECTS',
    title: 'SHOP',
    description: <>Physical artifacts.<br/>Limited editions.</>,
    action: '→ ACQUIRE',
    url: '#',
    isExpandable: true,
    planet: {
      sectionLabel: '// PHYSICAL ARTIFACTS',
      bio: 'The MTI Universe made material. Limited edition objects, apparel, and artifacts — each piece is a node in physical form. Production runs are small. Access is finite.',
      links: [
        { label: 'FULL CATALOG', url: '#', platform: 'SHOP' },
        { label: 'INSTAGRAM DROPS', url: '#', platform: 'IG' },
        { label: 'EMAIL LIST — FIRST ACCESS', url: 'mailto:contact@ageold.shop', platform: 'EMAIL' },
      ],
      contact: {
        label: 'WHOLESALE & COLLABS',
        value: 'OBJECT PARTNERSHIPS',
        url: 'mailto:contact@ageold.shop'
      }
    }
  }
];
