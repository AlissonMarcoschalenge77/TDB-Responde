import { useState } from "react";
import Button from "../components/ui/Button";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQ() {
    //openIndex Variável que guarda QUAL pergunta está aberta
    //setOpenIndex	Função para MUDAR essa variável
    //useState	Hook do React que cria "memória" no componente
    //<number | null>	Tipo: pode ser número (0, 1, 2...) ou null (nenhuma)
    //null	Valor inicial: nenhuma pergunta aberta
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "O que é o TDB Responde?",
      answer:
        "É uma plataforma de atendimento centralizado desenvolvida para a ONG Turma do Bem, que unifica WhatsApp, e-mail e redes sociais em um único sistema.",
    },
    {
      question: "Quem pode usar o TDB Responde?",
      answer:
        "Foi desenvolvido especificamente para atender às necessidades da equipe de voluntários e beneficiários da Turma do Bem.",
    },
    {
      question: "É gratuito?",
      answer:
        "Sim! É um projeto acadêmico desenvolvido como Challenge sem fins lucrativos.",
    },
    {
      question: "Qual a localização da ONG?",
      answer:
        " Rua Maurício Francisco Klabin 449 Vila Mariana, São Paulo-SP, 04120-020 Fone 55 11 50847276",
    },
    {
      question: "Os dados dos assistidos são protegidos?",
      answer:
        "Sim, seguimos diretrizes de proteção de dados e apenas voluntários autorizados têm acesso às informações.",
    },
    {
      question: "Preciso fazer login para usar?",
      answer:
        "Sim, cada voluntário tem seu próprio login e senha para garantir a segurança das informações.",
    },
    {
      question: "Como faço para me tornar voluntário?",
      answer:
        "Entre em contato com a Turma do Bem pelo site oficial ou pelas redes sociais para saber como participar.",
    },
    {
      question: "Encontrei um erro, o que faço?",
      answer:
        "Entre em contato conosco pela página de contato ou envie um e-mail para reportar o problema.",
    },
    {
      question: "O sistema já está funcionando?",
      answer:
        "Atualmente é um MVP (Produto Mínimo Viável) em fase de desenvolvimento e testes.",
    },
    {
      question: "Quem desenvolveu o TDB Responde?",
      answer:
        "O projeto foi desenvolvido por Alisson Kawan e Marcos Vinicius, alunos do curso de Análise e Desenvolvimento de Sistemas da FIAP.",
    },
    {
      question: "Posso usar o TDB Responde na minha ONG?",
      answer:
        "O sistema foi desenvolvido especificamente para a Turma do Bem, mas entre em contato para conversarmos sobre adaptações.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-800">
          Perguntas Frequentes
        </h2>
        <p className="text-gray-600 mt-2 text-2xl">
          Tire suas dúvidas sobre o <span className="text-blue-600">TDB Responde</span>
        </p>
      </section>

      {/* Lista de FAQs */}
      <section className="py-12 max-w-3xl mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
          >
            {/* Pergunta (clicável) */}
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>
              <span
                className={`text-2xl transition-transform ${openIndex === index ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            {/* Resposta (aparece quando clicado) */}
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="pb-12 text-center">
        <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
            <Button href="/contato" variant="primary" size="large">
              Entre em contato
            </Button>
      </section>
    </div>
  );
}

export default FAQ;
