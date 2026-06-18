/**
 * ============================================================================
 *  CONTEÚDO DO SITE  —  edite os textos AQUI (e só aqui).
 * ----------------------------------------------------------------------------
 *  • Troque o texto entre as aspas. Mantenha as aspas e a vírgula no fim.
 *  • "destaque" = o trecho do título que aparece em turquesa. Precisa ser
 *    um pedaço EXATO do título correspondente (copie e cole). Deixe "" para
 *    nenhum destaque.
 *  • Listas (bullets, perguntas, itens): cada linha entre aspas, separada por
 *    vírgula. Pode adicionar/remover linhas.
 * ============================================================================
 */

export const content = {
  /* Barra de navegação (topo fixo) */
  nav: {
    links: [
      { label: "Por quê", href: "#por-que" },
      { label: "Arquitetura", href: "#arquitetura" },
      { label: "Para quem", href: "#para-quem" },
    ],
    cta: "Quero saber mais",
  },

  /* Hero (topo da página) */
  hero: {
    eyebrow: "Apresentado no Google Event",
    titulo:
      "Marque uma reunião com os dados da sua campanha",
    destaque: "dados da sua campanha",
    paragrafo:
      "Verus é uma plataforma da Convert que conecta seus dados em uma IA conversacional para decisões mais rápidas e precisas",
    ctaPrimario: "Quero saber mais sobre o Verus",
  },

  /* Card dos quatro analistas (no hero) */
  console: {
    eyebrow: "As quatro analistas",
    label: "Pergunta em linguagem natural",
    analistas: [
      { nome: "Ada", papel: "Investimento em mídia" },
      { nome: "Parisa", papel: "Efetividade criativa" },
      { nome: "Grace", papel: "Comportamento de audiência" },
      { nome: "Radia", papel: "Previsão de performance" },
    ],
    // Perguntas que aparecem digitando (uma por analista, na ordem acima)
    perguntas: [
      "Onde estou desperdiçando budget de mídia agora?",
      "Qual criativo está puxando mais conversão esta semana?",
      "Quais segmentos de audiência têm maior risco de churn?",
      "Qual a projeção de performance da campanha no próximo mês?",
    ],
  },

  /* Seção "Por que o Verus existe?" */
  valor: {
    eyebrow: "Por que o Verus existe?",
    titulo:
      "O desafio de hoje é ter governança e transformar dados em contexto, decisão e ação.",
    destaque: "contexto, decisão e ação.",
    paragrafo:
      "O Verus conecta plataformas, dashboards, times e lideranças e assim encurta a distância entre o dado e a decisão.",
    bullets: [
      "Reúne dados dispersos em uma visão unificada, sem ruídos e 100% acionável.",
      "Reduz a dependência de análises manuais.",
      "Permite perguntas em linguagem natural: você conversa com seus dados",
      "Responde e faz conexões entre investimento, mídia, resultado e criação em segundos",
    ],
  },

  /* Seção "O que o Verus conecta?" (arquitetura) */
  arquitetura: {
    eyebrow: "O que o Verus conecta?",
    titulo:
      "Graças a uma camada semântica proprietária, que dá significado e relação entre as métricas, o Verus conecta: ",
    destaque: "camada semântica proprietária",
    blocos: [
      {
        step: "01",
        titulo: "Dados de performance",
        desc: "REVER TEXTO: Investimento, entregas e resultados de cada canal, normalizados em um modelo comum.",
      },
      {
        step: "02",
        titulo: "Investimento em mídia",
        desc: "REVER TEXTO: Receita, pipeline, CAC, LTV e metas conectados ao contexto de marketing.",
      },
      {
        step: "03",
        titulo: "Eficiência criativa",
        desc: "REVER TEXTO: O dicionário que dá significado, governança e relação entre as métricas.",
      },
      {
        step: "04",
        titulo: "Comportamento da audiência",
        desc: "REVER TEXTO: Pergunta em linguagem natural com respostas contextualizadas e acionáveis.",
      },
    ],
    tagNucleo: "Núcleo proprietário",
    fecho:
      "O Verus faz o trabalho antes da resposta: organiza, contextualiza e governa os dados.",
    fechoDestaque: "organiza, contextualiza e governa os dados.",
  },

  /* Seção "Para quem é?" */
  audiencia: {
    eyebrow: "Para quem é?",
    titulo: "Feito para quem decide com dados e responsabilidade.",
    destaque: "dados e responsabilidade.",
    itens: [
      {
        titulo: "CMOs e lideranças de marketing",
        desc: "Visão executiva consolidada para decidir com base em contexto.",
      },
      {
        titulo: "Heads de growth e performance",
        desc: "Leitura rápida do que move o resultado em cada canal e iniciativa.",
      },
      {
        titulo: "Times de mídia e CRM",
        desc: "Da alocação de budget à jornada do cliente, sob a mesma linguagem de dados.",
      },
      {
        titulo: "Áreas de BI, dados e analytics",
        desc: "Uma camada semântica governada que reduz retrabalho e pedidos manuais.",
      },
      {
        titulo: "Empresas que decidem com recorrência",
        desc: "Para quem transforma dados em decisões recorrentes e consistentes.",
      },
    ],
  },

  /* Bloco de texto ao lado do formulário */
  formulario: {
    eyebrow: "Falar com a Convert",
    titulo: "Quer entender como o Verus melhora a sua operação?",
    destaque: "melhora a sua operação?",
    paragrafo:
      "Preencha o formulário e o time da Convert entra em contato para conversar sobre aplicação, demonstração e próximos passos.",
  },

  /* Rodapé */
  footer: {
    descricao:
      "Verus é uma plataforma de inteligência de dados e IA conversacional da Convert.",
    links: [
      { label: "Site da Convert", href: "https://convert.com.br" },
      {
        label: "Política de Privacidade",
        href: "https://convert.com.br/politica-de-privacidade",
      },
      { label: "Contato", href: "#lead-form" },
    ],
    copy: "© 2026 Convert · Human Digital Business",
  },
} as const;
