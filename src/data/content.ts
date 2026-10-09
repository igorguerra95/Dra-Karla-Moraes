import heroImageNew from '../assets/images/regenerated_image_1791472444685.jpg';
import aboutImageNew from '../assets/images/regenerated_image_1791405202105.png';

export interface ServiceArea {
  id: string;
  category: 'neuro' | 'emocional';
  title: string;
  tagline: string;
  description: string;
  details: string[];
  duration: string;
  modality: 'Presencial e Online' | 'Exclusivo Presencial em Belém' | 'Presencial ou Online';
  badge: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  area: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  name: "Karla Moraes",
  title: "Psicologia / Neuropsicologia & Avaliação Psicológica",
  crp: "CRP 10/08480",
  phone: "(91) 98264-4888",
  phoneClean: "5591982644888",
  email: "contato@karlamoraesneuro.com.br",
  address: "Pedreira - Belém - Pará",
  addressShort: "Pedreira · Belém - Pará",
  hours: "Segunda a Sexta: 08h às 19h · Sábados: Horários especiais",
  headline: "Onde a ciência do cérebro encontra o acolhimento da sua essência.",
  subheadline: "Avaliação psicológica e neuropsicológica aprofundada, emissão de atestados psicológicos para concurso público e cirurgia bariátrica, testes validados e laudos técnicos conclusivos. Um espaço ético, confidencial e acolhedor em Belém e online para compreender sua mente com clareza científica.",
  whatsappDefaultMsg: "Olá, Dra. Karla Moraes! Gostaria de tirar dúvidas sobre avaliação neuropsicológica, laudos e atestados psicológicos (concurso público / cirurgia bariátrica), e verificar a disponibilidade de agenda.",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pedreira,+Bel%C3%A9m+-+Par%C3%A1",
  heroImage: heroImageNew,
  aboutImage: aboutImageNew,
  aboutQuote: "Compreender o funcionamento da mente humana é o primeiro passo para conquistar clareza, autonomia e direcionamento.",
  aboutText1: "Sou a Dra. Karla Moraes (CRP 10/08480), psicóloga clínica com atuação especializada em Psicologia / Neuropsicologia, com foco na realização de avaliações psicológicas e neuropsicológicas, emissão de atestados psicológicos para concurso público e cirurgia bariátrica, aplicação de testes normatizados e emissão de laudos clínicos detalhados. Minha prática clínica é fundada no rigor da neurociência contemporânea aliado a uma escuta empática, sensível e ética.",
  aboutText2: "Acredito que os testes e a investigação diagnóstica existem para iluminar potencialidades, compreender padrões cognitivos e fornecer respostas claras para você, seus médicos, terapeutas e instituições de ensino. O objetivo de um laudo técnico de qualidade é abrir caminhos e proporcionar segurança para as melhores tomadas de decisão.",
  aboutText3: "Atendo de forma presencial em Belém (PA), no bairro da Pedreira, em um consultório estruturado para oferecer privacidade, conforto e tranquilidade, além de atendimentos online com sigilo rigoroso para pacientes de diversas localidades."
};

export const SERVICES_DATA: ServiceArea[] = [
  {
    id: 'avaliacao-neuropsicologica',
    category: 'neuro',
    badge: 'Mapeamento Cognitivo',
    title: 'Avaliação Neuropsicológica',
    tagline: 'Investigação profunda das funções cerebrais e sua correlação com o comportamento.',
    description: 'Investigação minuciosa e estruturada da memória, atenção sustentada e alternada, raciocínio lógico, linguagem e funções executivas. Fundamental para o diagnóstico diferencial de TDAH em adultos e crianças, TEA, altas habilidades e declínio cognitivo.',
    details: [
      'Bateria de testes científicos homologados e validados pelo SATEPSI',
      'Diagnóstico diferencial minucioso para TDAH, Autismo e Dificuldades de Aprendizagem',
      'Laudo técnico conclusivo com respaldo para médicos neurologistas e psiquiatras',
      'Sessão explicativa de devolutiva com entrega do relatório e direcionamentos práticos'
    ],
    duration: '8 a 10 sessões incluso laudo e devolutiva',
    modality: 'Presencial e Online'
  },
  {
    id: 'avaliacao-psicologica',
    category: 'neuro',
    badge: 'Investigação Clínica & Atestados',
    title: 'Avaliação Psicológica & Atestados',
    tagline: 'Compreensão clínica e emissão de atestados para concursos, cirurgia bariátrica e psicodiagnóstico.',
    description: 'Processo técnico de avaliação psicológica clínica focado em compreender a saúde emocional, funções psíquicas e recursos adaptativos. Realiza avaliação com emissão oficial de Atestado Psicológico para posse em concurso público e avaliação pré-operatória para cirurgia bariátrica, com rigor ético e fundamentação científica do CFP.',
    details: [
      'Emissão de Atestado Psicológico para Concurso Público (comprovação de aptidão e saúde mental)',
      'Avaliação Psicológica pré-operatória e Atestado para Cirurgia Bariátrica e procedimentos cirúrgicos',
      'Entrevistas clínicas detalhadas, anamnese biopsicossocial e instrumentos reconhecidos pelo CFP',
      'Documento psicológico oficial emitido em conformidade estrita com a Resolução CFP nº 06/2019'
    ],
    duration: 'A partir de 4 sessões + sessão de devolutiva',
    modality: 'Presencial e Online'
  },
  {
    id: 'testes-neuropsicologicos',
    category: 'neuro',
    badge: 'Instrumentos Validados',
    title: 'Testes Psicológicos & Neuropsicológicos',
    tagline: 'Aplicação padronizada de ferramentas normatizadas pelo SATEPSI.',
    description: 'Mensuração quantitativa e qualitativa de habilidades como controle inibitório, velocidade de processamento mental, flexibilidade cognitiva, atenção concentrada e retenção mnemônica, comparando os resultados com tabelas normativas populacionais.',
    details: [
      'Uso exclusivo de testes padronizados e com parecer favorável do SATEPSI/CFP',
      'Análise criteriosa dos escores z, percentis e índices compostos',
      'Cruzamento de dados quantitativos com observação clínica qualitativa',
      'Interpretação individualizada respeitando a história de vida e escolaridade'
    ],
    duration: 'Sessões padronizadas conforme o protocolo de testagem',
    modality: 'Presencial e Online'
  },
  {
    id: 'emissao-laudos',
    category: 'neuro',
    badge: 'Rigor Técnico & Ético',
    title: 'Emissão de Laudos & Atestados Técnicos',
    tagline: 'Elaboração de documentos conclusivos com validade médica, jurídica e pericial.',
    description: 'Redação técnica e fundamentada de Laudos Neuropsicológicos, Atestados Psicológicos (concurso público e cirurgia bariátrica), Pareceres e Relatórios Psicológicos detalhados, elaborados em estrita consonância com as resoluções do CFP, apresentando perfil cognitivo, aptidão e recomendações.',
    details: [
      'Atestados psicológicos oficiais para posse em concursos públicos e liberação de cirurgia bariátrica',
      'Documento técnico completo com clareza para médicos, peritos e bancas examinadoras',
      'Descrição detalhada de todas as baterias e testes aplicados com resultados normatizados',
      'Sessão individual de devolutiva para esclarecer todas as dúvidas do laudo ou atestado'
    ],
    duration: 'Emitido após a conclusão das sessões de testagem e avaliação',
    modality: 'Presencial e Online'
  },
  {
    id: 'tdah-funcoes-executivas',
    category: 'neuro',
    badge: 'TDAH & Autismo (TEA)',
    title: 'Investigação de TDAH & Autismo (TEA)',
    tagline: 'Avaliação clínica especializada para queixas de TDAH, espectro autista e funções executivas.',
    description: 'Investigação diagnóstica especializada para crianças, adolescentes e adultos, com foco em esclarecer queixas de TDAH e suspeitas do Transtorno do Espectro Autista (TEA), diferenciando alterações atencionais, sobrecarga executiva e singularidades do neurodesenvolvimento.',
    details: [
      'Protocolo aprofundado para TDAH e Transtorno do Espectro Autista (TEA) em adultos e crianças',
      'Mapeamento de funções executivas, atenção sustentada, flexibilidade cognitiva e autorregulação',
      'Investigação de aspectos de interação social, comunicação, rotinas e comorbidades',
      'Laudo técnico conclusivo com plano de orientações adaptativas para estudo e trabalho'
    ],
    duration: 'Bateria estruturada de avaliação e testagem',
    modality: 'Presencial e Online'
  },
  {
    id: 'psicoterapia-individual',
    category: 'emocional',
    badge: 'Acolhimento Clínico',
    title: 'Psicoterapia Clínica Individual',
    tagline: 'Espaço acolhedor e seguro para elaboração de angústias, ansiedade e humor.',
    description: 'Atendimento clínico individual para adultos e jovens que buscam compreender seu sofrimento, lidar com sintomas de ansiedade, oscilações de humor e momentos de transição, com escuta atenta, ética e humanizada.',
    details: [
      'Escuta clínica empática e livre de julgamentos morais',
      'Compreensão articulada entre funcionamento neurológico e psíquico',
      'Fortalecimento da autonomia e regulação emocional no dia a dia',
      'Sessões regulares em consultório privativo ou teleconsulta protegida'
    ],
    duration: 'Sessões semanais de 50 minutos',
    modality: 'Presencial e Online'
  }
];

export const STATS_DATA = [
  { value: 1400, prefix: '+', label: 'Consultas & Sessões', sublabel: 'com rigor técnico e acolhimento' },
  { value: 10, prefix: '+', label: 'Anos de Trajetória', sublabel: 'dedicados à psicologia / neuropsicologia clínica' },
  { value: 98, suffix: '%', label: 'Índice de Confiança', sublabel: 'laudos e pareceres conclusivos' },
  { value: 100, suffix: '%', label: 'Sigilo Profissional', sublabel: 'respaldado pelo Código de Ética do CFP' }
];

export const PILLARS_DATA = [
  {
    title: 'Rigor Científico & Neurociências',
    description: 'Avaliações e testes amparados pela literatura neuropsicológica contemporânea e validados pelo Conselho Federal de Psicologia.',
    icon: 'Brain'
  },
  {
    title: 'Acolhimento Humanizado',
    description: 'Um espaço de escuta empática e cuidadosa, onde cada paciente é recebido com sensibilidade, sem julgamentos e com total respeito.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Laudos Técnicos & Atestados',
    description: 'Emissão de documentos conclusivos e atestados psicológicos para concurso público e cirurgia bariátrica, com clareza e validade oficial.',
    icon: 'FileText'
  },
  {
    title: 'Ética e Sigilo Absoluto',
    description: 'Atendimento presencial reservado no bairro da Pedreira (Belém) ou online com conformidade ética e proteção rigorosa aos seus dados.',
    icon: 'ShieldCheck'
  }
];

export const STEPS_DATA = [
  {
    step: '01',
    title: 'Contato & Acolhimento Inicial',
    description: 'Você entra em contato pelo WhatsApp. Esclarecemos dúvidas sobre valores, horários e compreendemos qual é a demanda de avaliação ou consulta.'
  },
  {
    step: '02',
    title: 'Anamnese & Entrevista Clínica',
    description: 'Sessão detalhada para investigar o histórico do desenvolvimento, queixas cognitivas e comportamentais, dinâmica familiar e rotina.'
  },
  {
    step: '03',
    title: 'Aplicação de Testes Científicos',
    description: 'Sessões estruturadas de aplicação de testes psicológicos e neuropsicológicos padronizados pelo SATEPSI para mapeamento minucioso das funções.'
  },
  {
    step: '04',
    title: 'Emissão de Laudo & Devolutiva',
    description: 'Entrega do laudo técnico com sessão detalhada de devolutiva, explicando todos os resultados e apontando os melhores encaminhamentos.'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-atestados',
    question: 'A Dra. Karla emite atestado psicológico para concurso público e cirurgia bariátrica?',
    answer: 'Sim! A Dra. Karla realiza avaliação psicológica e emite atestados e laudos psicológicos oficiais para posse em concursos públicos (comprovação de aptidão e saúde mental exigida em editais) e para avaliação pré-operatória de cirurgia bariátrica (exigência da equipe cirúrgica e planos de saúde). Todo o processo segue com rigor técnico as resoluções do Conselho Federal de Psicologia (CFP), garantindo total validade pericial e institucional.'
  },
  {
    id: 'faq-1',
    question: 'O que é a avaliação neuropsicológica e quando ela é indicada?',
    answer: 'A avaliação neuropsicológica é uma investigação diagnóstica aprofundada que utiliza testes científicos normatizados para mapear funções cerebrais como atenção, memória, linguagem, raciocínio e funções executivas. É indicada para esclarecer queixas de déficit de atenção (TDAH), suspeitas de autismo (TEA), dificuldades escolares, alterações de memória ou demandas encaminhadas por neurologistas e psiquiatras.'
  },
  {
    id: 'faq-2',
    question: 'Como funciona a emissão do laudo neuropsicológico e psicológico?',
    answer: 'Após a conclusão das sessões de testagem e análise dos dados psicométricos, a Dra. Karla elabora um Laudo Técnico detalhado conforme as normas do Conselho Federal de Psicologia (CFP). Esse documento descreve todo o histórico, os testes aplicados, os resultados qualitativos e quantitativos, a conclusão diagnóstica e recomendações práticas para médicos, terapeutas e escolas, entregue em uma sessão exclusiva de devolutiva.'
  },
  {
    id: 'faq-3',
    question: 'Quais testes são aplicados durante o processo?',
    answer: 'São utilizados exclusivamente testes psicológicos e baterias neuropsicológicas validadas e com parecer favorável do SATEPSI (Sistema de Avaliação de Testes Psicológicos do CFP). A seleção dos instrumentos é personalizada de acordo com a idade, nível de escolaridade e objetivos específicos de cada paciente.'
  },
  {
    id: 'faq-4',
    question: 'Como funciona a consulta online? É possível fazer avaliação neuropsicológica online?',
    answer: 'A Dra. Karla realiza atendimentos online devidamente autorizados pelo cadastro e-Psi do CFP. Para a avaliação neuropsicológica, etapas de anamnese, devolutiva e determinados testes normatizados para aplicação remota podem ser conduzidos por videochamada criptografada. Em baterias que exigem manipulação física de materiais, é combinado o formato híbrido ou presencial no consultório em Belém.'
  },
  {
    id: 'faq-5',
    question: 'Você atende por convênios médicos ou planos de saúde?',
    answer: 'Os atendimentos são particulares para garantir o tempo adequado de cada sessão, estudo aprofundado do caso e redação minuciosa de cada laudo. Fornecemos recibos e notas fiscais com CRP e descrição técnica para que você possa solicitar reembolso junto ao seu plano de saúde (como Bradesco Saúde, SulAmérica, Unimed, Amil, etc.), conforme as diretrizes da ANS.'
  },
  {
    id: 'faq-6',
    question: 'Onde fica localizado o consultório físico em Belém e como agendar?',
    answer: 'O consultório presencial está situado no bairro da Pedreira, em Belém - Pará. Para agendar sua avaliação ou consulta, basta clicar no botão de "Entrar em contato" para conversar diretamente com a equipe pelo WhatsApp.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'dep-1',
    author: 'Mariana C.',
    context: 'Avaliação de TDAH em Adulto',
    area: 'Avaliação Neuropsicológica & Laudo',
    quote: 'A avaliação neuropsicológica com a Dra. Karla foi um divisor de águas na minha vida. O laudo explicou com tanta clareza as dificuldades de foco e memória que eu enfrentava desde a faculdade. O acolhimento dela tirou um peso enorme das minhas costas.'
  },
  {
    id: 'dep-2',
    author: 'Cláudia & Fernando R.',
    context: 'Pais de paciente em Avaliação Infantil',
    area: 'Avaliação Psicológica & Testes',
    quote: 'Precisávamos de um laudo minucioso e fundamentado para o neuropediatra e para a equipe pedagógica do nosso filho. A Dra. Karla aplicou os testes com enorme paciência e carinho, e o relatório entregue foi fundamental para direcionar a conduta médica.'
  },
  {
    id: 'dep-3',
    author: 'Lucas V.',
    context: 'Paciente em Acompanhamento Clínico',
    area: 'Psicoterapia Clínica Individual',
    quote: 'A Dra. Karla une um domínio científico impressionante sobre o funcionamento do cérebro com uma postura acolhedora e ética. Me senti ouvido e respeitado desde a primeira sessão.'
  }
];
