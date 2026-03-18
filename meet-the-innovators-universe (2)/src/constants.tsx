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
    id: 'mti-radio',
    index: '02',
    category: 'AUDIO',
    title: 'MTI RADIO',
    description: <>Live sessions.<br/>Frequency drops.</>,
    action: '→ TUNE IN',
    url: '#'
  },
  {
    id: 'akata-visions',
    index: '03',
    category: 'VISUAL',
    title: 'AKATA VISIONS',
    description: <>Direction. Film. Identity.<br/>Moving image.</>,
    action: '→ VIEW',
    url: '#'
  },
  {
    id: 'substack',
    index: '04',
    category: 'EDITORIAL',
    title: 'SUBSTACK',
    description: <>Long-form intelligence.<br/>The dispatch.</>,
    action: '→ READ',
    url: '#'
  },
  {
    id: 'mrktng-lab',
    index: '05',
    category: 'STRATEGY',
    title: 'MRKTNG LAB',
    description: <>Infrastructure. Growth.<br/>System architecture.</>,
    action: '→ BUILD',
    url: '#'
  },
  {
    id: 'archive',
    index: '06',
    category: 'CATALOG',
    title: 'ARCHIVE',
    description: <>The full body of work.<br/>Indexed. Permanent.</>,
    action: '→ EXPLORE',
    url: '#'
  },
  {
    id: 'live',
    index: '07',
    category: 'EVENTS',
    title: 'LIVE',
    description: <>Appearances. Shows.<br/>Presence.</>,
    action: '→ UPCOMING',
    url: '#'
  },
  {
    id: 'collective',
    index: '08',
    category: 'NETWORK',
    title: 'COLLECTIVE',
    description: <>The network.<br/>The operators.</>,
    action: '→ EXPAND',
    url: '#',
    isExpandable: true,
    subBrands: [
      { id: 'tse', platform: 'YT', name: 'TSE Top Shelf Ent.', description: 'The gold standard of the region. Premium entertainment.', url: 'https://www.youtube.com/@tsetopshelfentertainment2648', color: '#ff0000' },
      { id: 'coc-podcast', platform: 'YT', name: 'COC PODCAST', description: 'Culture. Opinion. Conversation.', url: 'https://www.youtube.com/@COCPodcast614', color: '#ff0000' },
      { id: 'trak-team', platform: 'FB', name: 'TRAK TEAM DJs', description: 'The selectors. The sound.', url: 'https://www.facebook.com/profile.php?id=61576360502116', color: '#1877f2' },
      { id: 'marlanda-dekine', platform: 'SS', name: 'MARLANDA DEKINE', description: 'Words. Soul. Dispatch.', url: 'https://substack.com/@dekinesoul?utm_source=global-search', color: '#ff6719' },
      { id: 'state-of-mynd', platform: 'IG', name: 'STATE OF MYND', description: 'Frequency. Vision. Identity.', url: 'https://www.instagram.com/tqstateofmynd/', color: '#c13584' }
    ]
  },
  {
    id: 'shop',
    index: '09',
    category: 'OBJECTS',
    title: 'SHOP',
    description: <>Physical artifacts.<br/>Limited editions.</>,
    action: '→ ACQUIRE',
    url: '#'
  }
];
