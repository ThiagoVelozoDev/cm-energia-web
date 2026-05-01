export interface Testimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  initials: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Eduardo',
    city: 'Boa Vista – RR',
    text: 'Instalei energia solar com a CM Energia e em 2 meses minha conta caiu de R$ 850 para R$ 30. O time do Rodrigo é extremamente profissional, do projeto à instalação. Recomendo sem hesitar!',
    rating: 5,
    initials: 'CE',
    service: 'Energia Solar',
  },
  {
    id: '2',
    name: 'Ana Paula Ferreira',
    city: 'Boa Vista – RR',
    text: 'Contratamos a CM Energia para o projeto elétrico do nosso galpão industrial. Trabalho impecável, dentro do prazo e com toda a documentação em ordem. Voltaremos a contratar com certeza.',
    rating: 5,
    initials: 'AP',
    service: 'Projetos Elétricos',
  },
  {
    id: '3',
    name: 'Marcos Rodrigues',
    city: 'Boa Vista – RR',
    text: 'A CM Energia instalou o sistema solar na minha fazenda. Agora tenho autonomia total para o bombeamento de água e armazenagem. Profissionais que realmente entendem do negócio.',
    rating: 5,
    initials: 'MR',
    service: 'Energia Solar',
  },
  {
    id: '4',
    name: 'Fernanda Costa',
    city: 'Boa Vista – RR',
    text: 'O laudo técnico que precisávamos para renovação do alvará foi entregue no prazo, com toda a qualidade técnica exigida pela concessionária. Equipe muito competente!',
    rating: 5,
    initials: 'FC',
    service: 'Laudos Técnicos',
  },
  {
    id: '5',
    name: 'João Batista Lima',
    city: 'Boa Vista – RR',
    text: 'Finalmente chegou energia na minha propriedade! A CM Energia construiu a rede rural com profissionalismo e transparência em cada etapa. Muito satisfeito com o resultado.',
    rating: 5,
    initials: 'JB',
    service: 'Redes MT',
  },
  {
    id: '6',
    name: 'Simone Albuquerque',
    city: 'Boa Vista – RR',
    text: 'Tínhamos um problema sério com quedas de tensão no condomínio. O Eng. Rodrigo identificou o problema e resolveu com um projeto elétrico preciso. Excelente atendimento!',
    rating: 5,
    initials: 'SA',
    service: 'Projetos Elétricos',
  },
];
