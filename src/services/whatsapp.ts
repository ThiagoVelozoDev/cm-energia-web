const WHATSAPP_NUMBER = '5595981258346';

export function getWhatsAppLink(message?: string): string {
  const encoded = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${WHATSAPP_NUMBER}${encoded}`;
}

export const whatsappMessages = {
  hero: 'Olá! Vim pelo site da CM Energia e gostaria de solicitar um orçamento de energia solar.',
  services: 'Olá! Tenho interesse nos serviços da CM Energia. Poderia me passar mais informações?',
  solar: 'Olá! Quero saber quanto posso economizar com energia solar. Poderia me enviar um orçamento?',
  cta: 'Olá! Gostaria de falar com um especialista da CM Energia sobre meu projeto.',
  contact: 'Olá! Acabei de preencher o formulário no site. Aguardo contato!',
  projects: 'Olá! Vi os projetos da CM Energia e gostaria de um orçamento para o meu projeto.',
};
