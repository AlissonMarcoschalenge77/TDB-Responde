// src/pages/PortalBeneficiario.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { loadTDBState, saveTDBState } from '../context/tdbStorage';
import type { Atendimento, CriancaAdolescente, MulherApolonia } from '../types';

function nomePessoa(a: Atendimento) {
  return a.tipo === 'crianca'
    ? (a.pessoa as CriancaAdolescente).nomeCodificado
    : (a.pessoa as MulherApolonia).codinome;
}

function badgeStatus(s: string) {
  const map: Record<string, string> = {
    'Aberto':        'bg-blue-100 text-blue-800',
    'Em andamento':  'bg-yellow-100 text-yellow-800',
    'Aguardando':    'bg-purple-100 text-purple-800',
    'Encerrado':     'bg-green-100 text-green-700',
  };
  return map[s] ?? 'bg-gray-100 text-gray-700';
}

function PortalBeneficiario() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadTDBState());
  const [chatInput, setChatInput] = useState('');
  const [atendAberto, setAtendAberto] = useState<Atendimento | null>(null);

  // Filtra pelo código/codinome que bate com o login
  const meuNome = user?.nome?.toUpperCase() ?? '';
  const meusAtendimentos = state.atendimentos.filter(a => {
    const nome = nomePessoa(a).toUpperCase();
    return nome === meuNome || nome.includes(meuNome) || meuNome.includes(nome);
  });
  const ativos    = meusAtendimentos.filter(a => a.status !== 'Encerrado');
  const encerrados = meusAtendimentos.filter(a => a.status === 'Encerrado');

  const sendMsg = () => {
    if (!chatInput.trim() || !atendAberto) return;
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const updatedAtend = {
      ...atendAberto,
      mensagens: [...atendAberto.mensagens, { de: 'pessoa' as const, texto: chatInput.trim(), hora }],
    };
    const newState = {
      ...state,
      atendimentos: state.atendimentos.map(a => a.id === atendAberto.id ? updatedAtend : a),
    };
    setState(newState);
    saveTDBState(newState);
    setAtendAberto(updatedAtend);
    setChatInput('');
  };

  return (
    <div>
      {/* Header — mesmo padrão da NavBar do projeto */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-blue-200 hover:text-white text-sm transition-colors"
          >
            ← Página principal
          </button>
          <span className="text-blue-400">|</span>
          <span className="text-sm font-semibold">Portal do Beneficiário</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{user?.nome}</span>
        </div>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="text-xs text-blue-200 hover:text-white transition-colors"
        >
          Sair →
        </button>
      </div>

      {/* Hero — mesmo padrão das páginas institucionais */}
      <section className="bg-blue-50 py-9 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Olá, <span className="text-blue-600">{user?.nome}</span>! 👋
        </h2>
        <p className="text-gray-600 mt-2 text-xl">
          Acompanhe seus atendimentos e converse com nossos voluntários
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Atendimentos ativos */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Seus atendimentos</h3>

          {ativos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-10 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-500 font-medium">Nenhum atendimento ativo no momento.</p>
              <p className="text-gray-400 text-sm mt-1">
                Seu código de acesso é <strong>{user?.nome}</strong>. Ele deve corresponder ao código do seu atendimento.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {ativos.map(a => {
                const vol = a.voluntarioId ? state.voluntarios.find(v => v.id === a.voluntarioId) : null;
                const ultimaMsg = a.mensagens[a.mensagens.length - 1];
                return (
                  <div
                    key={a.id}
                    onClick={() => setAtendAberto(a)}
                    className="bg-white rounded-lg shadow-md border border-gray-100 p-6 cursor-pointer hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-800">{nomePessoa(a)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStatus(a.status)}`}>
                            {a.status}
                          </span>
                          {a.prioridade === 3 && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">
                              Urgente
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Canal: <strong>{a.canal}</strong> · Aberto em {a.dataAbertura}
                        </p>
                        {ultimaMsg && (
                          <p className="text-sm text-gray-400 truncate">
                            💬 {ultimaMsg.de === 'voluntario' ? `${vol?.nome ?? 'Voluntário'}: ` : 'Você: '}
                            {ultimaMsg.texto}
                          </p>
                        )}
                      </div>
                      <div className="text-center shrink-0">
                        {vol ? (
                          <>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-1 transition-transform duration-300 hover:scale-110">
                              {vol.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                            </div>
                            <p className="text-xs text-gray-500">{vol.nome.split(' ')[0]}</p>
                            <p className="text-[10px] text-gray-400">{vol.especialidade}</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-400 text-center">Aguardando<br />voluntário</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Encerrados */}
        {encerrados.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-gray-600 mb-4">Atendimentos encerrados</h3>
            <div className="space-y-3">
              {encerrados.map(a => (
                <div
                  key={a.id}
                  className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <span className="font-medium text-gray-600 text-sm">{nomePessoa(a)}</span>
                    <p className="text-xs text-gray-400 mt-0.5">Aberto em {a.dataAbertura} · Canal: {a.canal}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                    Encerrado
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Info de contato — mesmo padrão de seção das páginas institucionais */}
        <section className="bg-gray-50 rounded-lg border border-gray-100 p-8">
          <h4 className="text-xl font-bold text-gray-800 mb-4">Precisa de mais ajuda?</h4>
          <p className="text-gray-600 mb-4">
            Nossa equipe está disponível para te atender diretamente:
          </p>
          <div className="space-y-2 text-gray-600 text-sm mb-6">
            <div>📍 Rua Maurício Francisco Klabin 449, Vila Mariana — São Paulo/SP</div>
            <div>📞 (11) 5084-7276</div>
          </div>
          <button
            onClick={() => navigate('/contato')}
            className="inline-block rounded-xl font-semibold transition-colors transition-transform duration-300 hover:scale-105 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3"
          >
            Fale com a equipe
          </button>
        </section>

      </div>

      {/* Modal de chat */}
      {atendAberto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-800">Atendimento #{atendAberto.id}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full inline-block font-medium mt-1 ${badgeStatus(atendAberto.status)}`}>
                  {atendAberto.status}
                </span>
              </div>
              <button
                onClick={() => setAtendAberto(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Mensagens */}
              <div className="h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                {atendAberto.mensagens.map((m, i) => {
                  const vol = atendAberto.voluntarioId
                    ? state.voluntarios.find(v => v.id === atendAberto.voluntarioId)
                    : null;
                  return (
                    <div
                      key={i}
                      className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                        m.de === 'voluntario'
                          ? 'bg-blue-600 text-white self-end rounded-br-sm'
                          : 'bg-white border border-gray-200 self-start rounded-bl-sm'
                      }`}
                    >
                      {m.texto}
                      <div className={`text-[10px] mt-1 ${m.de === 'voluntario' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {m.de === 'voluntario' ? (vol?.nome ?? 'Voluntário') : user?.nome} · {m.hora}
                      </div>
                    </div>
                  );
                })}
                {atendAberto.mensagens.length === 0 && (
                  <span className="text-gray-400 text-xs m-auto">Nenhuma mensagem ainda.</span>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={sendMsg}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortalBeneficiario;