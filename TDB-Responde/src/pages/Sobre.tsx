import Button from "../components/ui/Button";

function Sobre() {
  // Dados das tecnologias
  const technologies = ['HTML5', 'Tailwindcss', 'JavaScript', 'Git & GitHub', 'TypeScript', 'React', 'Vite', 'Bibliotecas React'];
  
  // Dados do roadmap futuro
  const futureFeatures = [
    'Histórico de atendimentos',
    'Filtros avançados de busca',
    'Integração direta com WhatsApp Business',
    'Integração com e-mail',
    'Dashboard de análises'
  ];

  return (
    <div>
      {/* Sessao principal */}
      <section className="bg-blue-50 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">
            Conheça o <span className="text-blue-600">TDB Responde</span>
          </h2>
          <p className="text-gray-600 text-2xl">
            Um projeto nascido da necessidade de otimizar o atendimento
          </p>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-16 max-w-4xl mx-auto px-4 space-y-12">
        
        {/* O Desafio */}
        <article>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            O Desafio
          </h3>
          <p className="text-gray-600 leading-relaxed">
            A ONG <strong>Turma do Bem</strong> recebe diversos atendimentos vindos de diferentes canais: 
            WhatsApp, e-mail e redes sociais. Esse cenário criava dificuldades para organizar, 
            acompanhar e responder de forma humanizada.
          </p>
        </article>

        {/* A Solução */}
        <article>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            A Solução
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Desenvolvemos o <strong>TDB Responde</strong>, um MVP (Produto Mínimo Viável) que unifica 
            e organiza todos os atendimentos em uma única plataforma, facilitando a comunicação, 
            garantindo respostas mais rápidas e humanizadas.
          </p>
        </article>

        {/* Tecnologias Utilizadas */}
        <article>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Tecnologias Utilizadas
          </h3>
          <div className="flex flex-wrap gap-3 ">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium transition-transform duration-300 hover:scale-125"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* Roadmap Futuro */}
        <article>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Roadmap Futuro
          </h3>
          <p className="text-gray-600 mb-4">
            Nosso objetivo é evoluir o MVP para um sistema completo de atendimento digital com:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            {futureFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        {/*Chamada para ação */}
        <article className="text-center bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Quer saber mais?
          </h3>
          <p className="text-gray-600 mb-6">
            Entre em contato conosco para mais informações sobre o projeto.
          </p>
          <Button href="/contato" variant="primary" size="large">
              Fale Conosco!
            </Button>
        </article>

      </section>
    </div>
  );
}

export default Sobre;