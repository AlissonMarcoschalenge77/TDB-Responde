interface Phase {
  title: string;
  status: 'Concluído' | 'Em andamento' | 'Futuro';
  items: string[];
}

function Roadmap() {
  const phases: Phase[] = [
    {
      title: 'Fase 1 - Fundação',
      status: 'Concluído',
      items: [
        'Estrutura base do site',
        'Páginas institucionais',
        'Design responsivo',
        'Navegação entre páginas'
      ]
    },
    {
      title: 'Fase 2 - MVP',
      status: 'Concluído',
      items: [
        'Sistema de cadastro de atendimentos',
        'Integração com Telegram',
        'Histórico básico',
        'Busca simples'
      ]
    },
    {
      title: 'Fase 3 - Frameworks',
      status: 'Concluído',
      items: [
        'Utilizar banco de dados',
        'Notificações em tempo real com o telegram',
        'Remodelar o site usando REACT, Vite, Tailwind e TypeScript',
        'Avançar nos modelos de IA'
      ]
    },
    {
      title: 'Fase 4 - Dashboard',
      status: 'Em andamento',
      items: [
        'Métricas de atendimento',
        'Relatórios automáticos',
        'Gráficos de desempenho',
        'Exportação de dados'
      ]
    },
    {
      title: 'Fase 5 - Mobile',
      status: 'Futuro',
      items: [
        'Aplicativo Android',
        'Aplicativo iOS',
        'Notificações push',
        'Offline mode'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800 border-green-300';
      case 'Em andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Futuro': return 'bg-gray-100 text-gray-600 border-gray-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      {/* Principal */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-800 ">Roadmap</h2>
        <p className="text-gray-600 mt-2 text-2xl">Evolução do projeto <span className="text-blue-600">TDB Responde</span></p>
      </section>

      {/* Timeline */}
      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              
              {/* Linha conectora (exceto no último) */}
              {index !== phases.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gray-300"></div>
              )}

              {/* Card da fase */}
              <div className="flex gap-4">
                
                {/* Bolinha indicadora */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 ${
                  phase.status === 'Concluído' ? 'bg-green-500 border-green-200' :
                  phase.status === 'Em andamento' ? 'bg-yellow-500 border-yellow-200' :
                  'bg-gray-300 border-gray-200'
                }`}>
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>

                {/* Conteúdo */}
                <div className="flex-grow bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{phase.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(phase.status)}`}>
                      {phase.status}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className={`w-2 h-2 rounded-full ${
                          phase.status === 'Concluído' ? 'bg-green-500' :
                          phase.status === 'Em andamento' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legenda */}
      <section className="pb-12 max-w-4xl mx-auto px-4">
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>Em andamento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
            <span>Futuro</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Roadmap;