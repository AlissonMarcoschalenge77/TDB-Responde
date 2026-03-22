// src/pages/Sobre.tsx
import Button from "../components/ui/Button";

function Sobre() {
  const technologies = [
    'HTML5', 'Tailwind CSS', 'JavaScript', 'TypeScript',
    'React', 'Vite', 'React Hook Form', 'React Router DOM',
    'Git & GitHub', 'localStorage API',
  ];

  const futureFeatures = [
    'Integração direta com WhatsApp Business',
    'Integração com e-mail corporativo',
    'Dashboard de análises e relatórios',
    'Filtros avançados de busca',
    'Aplicativo mobile (Android e iOS)',
    'Notificações push em tempo real',
  ];

  const problemas = [
    {
      icon: '📱',
      title: 'Múltiplos canais desconectados',
      desc: 'WhatsApp, e-mail e redes sociais sem integração, gerando perda de mensagens e respostas duplicadas.',
    },
    {
      icon: '🔍',
      title: 'Sem histórico centralizado',
      desc: 'Voluntários não conseguiam acompanhar o histórico de cada beneficiário entre os atendimentos.',
    },
    {
      icon: '⏱️',
      title: 'Tempo de resposta alto',
      desc: 'A falta de triagem e priorização deixava casos urgentes sem atendimento imediato.',
    },
    {
      icon: '👥',
      title: 'Dificuldade de captação',
      desc: 'Novos voluntários não tinham um canal simples para se inscrever e começar a ajudar.',
    },
  ];

  const solucoes = [
    {
      icon: '⚡',
      title: 'Atendimento centralizado',
      desc: 'Todos os canais em um único painel. Voluntários veem tudo em um só lugar.',
    },
    {
      icon: '🔒',
      title: 'Protocolo de sigilo',
      desc: 'Casos sensíveis de Mulher Apolônia com acesso restrito, codinomes e controle de sigilo absoluto.',
    },
    {
      icon: '📊',
      title: 'Dashboard em tempo real',
      desc: 'Métricas de atendimentos, urgências em destaque e visão geral por canal e tipo de pessoa.',
    },
    {
      icon: '🎯',
      title: 'Triagem por prioridade',
      desc: 'Atendimentos classificados por prioridade (baixa, média, alta) com alertas visuais para casos urgentes.',
    },
    {
      icon: '💬',
      title: 'Chat integrado',
      desc: 'Comunicação direta entre voluntário e beneficiário dentro do próprio sistema, com histórico salvo.',
    },
    {
      icon: '📋',
      title: 'Captação de voluntários',
      desc: 'Formulário público de inscrição com aprovação pelo admin, criando o acesso automaticamente.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">
            Conheça o <span className="text-blue-600">TDB Responde</span>
          </h2>
          <p className="text-gray-600 text-2xl">
            Um sistema de atendimento centralizado desenvolvido para a{' '}
            <strong>Turma do Bem</strong>
          </p>
        </div>
      </section>

      {/* O que é */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">O que é o TDB Responde?</h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            O <strong>TDB Responde</strong> é um MVP (Produto Mínimo Viável) desenvolvido como projeto
            acadêmico pela FIAP em parceria com a ONG <strong>Turma do Bem</strong>. O sistema unifica
            e organiza todos os atendimentos da ONG em uma única plataforma digital, facilitando a
            comunicação entre voluntários e beneficiários.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            A plataforma atende dois públicos distintos: <strong>crianças e adolescentes</strong> que
            recebem atendimento odontológico gratuito, e mulheres em situação de vulnerabilidade
            cadastradas no <strong>Programa Apolônia</strong>, com protocolo especial de sigilo e proteção.
          </p>
        </div>
      </section>

      {/* Os problemas */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">Os desafios da ONG</h3>
          <p className="text-center text-gray-600 mb-10 text-lg">
            O que motivou a criação do sistema
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemas.map((p) => (
              <article
                key={p.title}
                className="p-6 rounded-lg shadow-md text-center border bg-white border-gray-100 transition-transform duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">{p.title}</h4>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* As soluções */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">Como o TDB Responde resolve</h3>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Funcionalidades desenvolvidas para cada problema identificado
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucoes.map((s, i) => (
              <article
                key={s.title}
                className={`p-6 rounded-lg shadow-md border transition-transform duration-300 hover:scale-105 ${
                  i === 0 ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-gray-100'
                }`}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">{s.title}</h4>
                <p className="text-gray-600 text-sm">{s.desc}</p>
                {i === 0 && (
                  <span className="inline-block mt-3 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Principal
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona o fluxo */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Como funciona</h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Beneficiário entra em contato', desc: 'Via WhatsApp, e-mail, Instagram ou presencialmente. A demanda chega ao sistema.' },
              { step: '2', title: 'Triagem e abertura do atendimento', desc: 'O voluntário abre um atendimento, classifica a prioridade e registra os dados do beneficiário com segurança.' },
              { step: '3', title: 'Atribuição ao voluntário responsável', desc: 'O atendimento é atribuído ao voluntário com a especialidade adequada (odontologia, psicologia, direito etc.).' },
              { step: '4', title: 'Acompanhamento e comunicação', desc: 'Voluntário e beneficiário se comunicam pelo chat integrado. O status é atualizado em tempo real.' },
              { step: '5', title: 'Encerramento e histórico', desc: 'Ao finalizar, o atendimento é encerrado. Todo o histórico fica registrado no sistema para consulta futura.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Tecnologias utilizadas</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium transition-transform duration-300 hover:scale-125"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Roadmap Futuro */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">Roadmap futuro</h3>
          <p className="text-center text-gray-600 mb-10">
            Nosso objetivo é evoluir o MVP para um sistema completo de atendimento digital
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <article className="text-center bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Quer saber mais ou colaborar?</h3>
          <p className="text-gray-600 mb-6">
            Entre em contato com a equipe ou conheça os criadores do projeto.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button href="/contato" variant="primary" size="large">
              Fale Conosco
            </Button>
            <Button href="/integrantes" variant="secondary" size="large">
              Ver a Equipe
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Sobre;