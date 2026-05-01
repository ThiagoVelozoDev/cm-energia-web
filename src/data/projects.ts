export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  image: string;
  power?: string;
}

export const projectCategories = [
  'Todos',
  'Energia Solar',
  'Projetos Elétricos',
  'Aterramento e SPDA',
  'Subestações',
  'Redes MT',
  'Geradores',
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema Solar Residencial – 8,4 kWp',
    category: 'Energia Solar',
    description: 'Instalação de sistema fotovoltaico residencial com 24 módulos de 350W e inversor string. O sistema gera em média 900 kWh/mês, eliminando 100% da conta de energia.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    power: '8,4 kWp',
  },
  {
    id: '2',
    title: 'Solar Comercial – Supermercado 42 kWp',
    category: 'Energia Solar',
    description: 'Sistema fotovoltaico de grande porte para supermercado local. 120 módulos instalados em cobertura metálica com monitoramento em tempo real.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
    power: '42 kWp',
  },
  {
    id: '3',
    title: 'Subestação Abrigada 300 kVA',
    category: 'Subestações',
    description: 'Construção de subestação abrigada com transformador de 300 kVA, cubículos de média tensão e sistema de proteção completo para indústria local.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: '4',
    title: 'Projeto Elétrico Industrial',
    category: 'Projetos Elétricos',
    description: 'Projeto elétrico completo de galpão industrial de 2.000 m², incluindo quadros de distribuição, spda, aterramento e sistema de iluminação LED.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    id: '5',
    title: 'SPDA – Torre de Telecomunicações',
    category: 'Aterramento e SPDA',
    description: 'Sistema de proteção contra descargas atmosféricas para torre de comunicação de 60m. Malha de aterramento com resistência inferior a 5Ω.',
    location: 'Interior de RR',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    id: '6',
    title: 'Rede de Distribuição Rural – 8 km',
    category: 'Redes MT',
    description: 'Construção de rede de distribuição de média tensão 13,8 kV em área rural, beneficiando 12 propriedades rurais com acesso à energia elétrica.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  },
  {
    id: '7',
    title: 'Solar Agronegócio – Fazenda 24 kWp',
    category: 'Energia Solar',
    description: 'Sistema solar para propriedade rural com bombeamento de água e climatização de instalações. Autonomia energética total para operações do agronegócio.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80',
    power: '24 kWp',
  },
  {
    id: '8',
    title: 'Grupo Gerador 250 kVA – Hospital',
    category: 'Geradores',
    description: 'Instalação de grupo gerador de emergência com transferência automática para hospital regional. Sistema homologado pela ANEEL com autonomia de 72 horas.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
  },
  {
    id: '9',
    title: 'Solar Condomínio – Áreas Comuns 15 kWp',
    category: 'Energia Solar',
    description: 'Sistema solar para geração compartilhada nas áreas comuns de condomínio residencial. Redução de 90% nos custos de energia da administração.',
    location: 'Boa Vista – RR',
    image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80',
    power: '15 kWp',
  },
];
