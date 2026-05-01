export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  emoji: string;
  featured: boolean;
  slug: string;
}

export const services: Service[] = [
  {
    id: 'solar',
    title: 'Energia Solar',
    description: 'Sistemas fotovoltaicos residenciais, comerciais e industriais com economia de até 95% na conta de energia. Do projeto à instalação, cuidamos de tudo.',
    icon: 'Sun',
    emoji: '☀️',
    featured: true,
    slug: 'energia-solar',
  },
  {
    id: 'projetos',
    title: 'Projetos Elétricos',
    description: 'Projetos elétricos residenciais, comerciais e industriais conforme normas ABNT, com memorial descritivo e ART assinada por engenheiro.',
    icon: 'FileText',
    emoji: '📐',
    featured: false,
    slug: 'projetos-eletricos',
  },
  {
    id: 'laudos',
    title: 'Laudos Técnicos',
    description: 'Elaboração de laudos técnicos de instalações elétricas, laudos NR-10, vistorias e pareceres técnicos com validade legal.',
    icon: 'ClipboardCheck',
    emoji: '📋',
    featured: false,
    slug: 'laudos-tecnicos',
  },
  {
    id: 'aterramento',
    title: 'Aterramento e SPDA',
    description: 'Sistemas de aterramento e proteção contra descargas atmosféricas (para-raios) para residências, indústrias e torres de telecomunicações.',
    icon: 'Zap',
    emoji: '⚡',
    featured: false,
    slug: 'aterramento-spda',
  },
  {
    id: 'geradores',
    title: 'Geradores',
    description: 'Instalação, manutenção e transferência automática de grupos geradores. Solução completa para fornecimento ininterrupto de energia.',
    icon: 'Battery',
    emoji: '🔋',
    featured: false,
    slug: 'geradores',
  },
  {
    id: 'subestacoes',
    title: 'Subestações',
    description: 'Projeto, instalação e manutenção de subestações de energia elétrica aéreas e abrigadas, desde a concepção até a energização.',
    icon: 'Building',
    emoji: '🏭',
    featured: false,
    slug: 'subestacoes',
  },
  {
    id: 'redes',
    title: 'Redes de Média Tensão',
    description: 'Construção e manutenção de redes de distribuição de média tensão urbana e rural, incluindo postes, cabos e equipamentos de proteção.',
    icon: 'Network',
    emoji: '🔌',
    featured: false,
    slug: 'redes-media-tensao',
  },
];
