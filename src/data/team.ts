import rodrigoPhoto from '../assets/Rodrigo.png';
import elanPhoto from '../assets/Elan.png';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  badge: string;
  photo: string;
  linkedIn?: string;
}

export const team: TeamMember[] = [
  {
    id: 'rodrigo',
    name: 'Rodrigo Macedo',
    role: 'Engenheiro Eletricista',
    bio: 'Engenheiro Eletricista com sólida experiência em projetos de energia solar, subestações e redes de distribuição. Responsável técnico pela CM Energia, garante a qualidade e conformidade de cada projeto executado, desde o dimensionamento até a aprovação nas concessionárias.',
    badge: 'CREA/RR Nº 000000-D',
    photo: rodrigoPhoto,
  },
  {
    id: 'elan',
    name: 'Elan Cardeque',
    role: 'Sócio-Administrador',
    bio: 'Especialista em gestão de projetos e relacionamento com clientes, Elan lidera a operação comercial e administrativa da CM Energia. Com foco em excelência no atendimento, garante que cada solução seja entregue no prazo, com transparência e comprometimento total.',
    badge: 'Gestão e Operações',
    photo: elanPhoto,
  },
];
