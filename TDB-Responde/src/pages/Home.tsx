import Button from "../components/ui/Button";
import FeatureCard from "../components/ui/FeatureCard";

function Home() {
  //aplicando dados aos cards da Feature

  const features = [
    {
      icon: "⚡",
      title: "Mais Ágil",
      description:
        "Responda aos atendimentos em tempo real, centralizando todas as comunicações.",
    },
    {
      icon: "❤️",
      title: "Mais Acolhedor",
      description:
        "Humanize o atendimento com respostas personalizadas e humanizadas.",
    },
    {
      icon: "🔗",
      title: "Integrado",
      description:
        "Unifique WhatsApp, e-mail e redes sociais em um único sistema.",
    },
    {
      icon: "📊",
      title: "Organizado",
      description:
        "Tenha controle total sobre todos os seus atendimentos e históricos.",
    },
  ];

  return (
    <>
      <div>
            {/*Sessao Principal, banner principal*/}
        <section className="bg-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Bem-vindo ao <span className="text-blue-600">TDB Responde</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Centralize todos os seus atendimentos em um único lugar
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="/contato" variant="primary" size="large">
                Entrar em Contato
              </Button>
              <Button href="/sobre" variant="secondary" size="large">
                Saiba Mais
              </Button>
            </div>
          </div>
        </section>

            {/*Cards que vão mostrar as vantagens do projeto */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Por que TDB Responde?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

            {/* Missão do projeto */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Nossa Missão
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Transformar o atendimento da <strong>Turma do Bem</strong> em uma
              experiência mais rápida, eficiente e acolhedora, unindo tecnologia
              e empatia em um único sistema.
            </p>
            <div className="p-6">
              <p className="text-blue-800 font-bold text-lg">
                Tudo isso com o objetivo de servir melhor aqueles que mais
                precisam.
              </p>
            </div>
          </div>
        </section>

            {/* Chamar para ação */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Pronto para começar?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Entre em contato conosco e saiba como o TDB Responde pode
              transformar seu atendimento.
            </p>
            <Button href="/contato" variant="primary" size="large">
              Fale Conosco!
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
