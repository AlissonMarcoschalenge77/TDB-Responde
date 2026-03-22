// src/pages/PortalBeneficiario.tsx
// Portal simples para o beneficiário: ver seus atendimentos e enviar mensagem.

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
    'Aberto': 'bg-blue-100 text-blue-800',
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Aguardando': 'bg-purple-100 text-purple-800',
    'Encerrado': 'bg-green-100 text-green-700',
  };
  return map[s] ?? 'bg-gray-100 text-gray-700';
}

function PortalBeneficiario() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadTDBState());
  const [chatInput, setChatInput] = useState('');
  const [atendAberto, setAtendAberto] = useState<Atendimento | null>(null);

  // Para a demo, mostra todos os atendimentos não encerrados (em um sistema real
  // filtraria pelo ID da pessoa logada)
  const meusAtendimentos = state.atendimentos.filter(a => a.status !== 'Encerrado');
  const encerrados = state.atendimentos.filter(a => a.status === 'Encerrado');

  const sendMsg = () => {
    if (!chatInput.trim() || !atendAberto) return;
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const updatedAtend = {
      ...atendAberto,
      mensagens: [...atendAberto.mensagens, { de: 'pessoa' as const, texto: chatInput.trim(), hora }],
    };
    const newState = { ...state, atendimentos: state.atendimentos.map(a => a.id === atendAberto.id ? updatedAtend : a) };
    setState(newState);
    saveTDBState(newState);
    setAtendAberto(updatedAtend);
    setChatInput('');
  };

  return (
    <div>
      {/* Header do portal */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Portal do Beneficiário</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{user?.nome}</span>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} className="text-xs text-blue-200 hover:text-white transition-colors">
          Sair →
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Boas-vindas */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Olá, {user?.nome}! 👋</h2>
          <p className="text-gray-600 text-sm">
            Aqui você pode acompanhar seus atendimentos e se comunicar com nossa equipe de voluntários.
          </p>
        </div>

        {/* Atendimentos ativos */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Seus atendimentos em andamento</h3>
          {meusAtendimentos.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400 text-sm">
              Nenhum atendimento ativo no momento.
            </div>
          ) : (
            <div className="space-y-3">
              {meusAtendimentos.map(a => {
                const vol = a.voluntarioId ? state.voluntarios.find(v => v.id === a.voluntarioId) : null;
                const ultimaMsg = a.mensagens[a.mensagens.length - 1];
                return (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-200 transition-colors cursor-pointer" onClick={() => setAtendAberto(a)}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800 text-sm">{nomePessoa(a)}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeStatus(a.status)}`}>{a.status}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Canal: {a.canal} · Aberto em {a.dataAbertura}
                        </div>
                        {ultimaMsg && (
                          <div className="text-xs text-gray-400 mt-2 truncate max-w-xs">
                            💬 {ultimaMsg.texto}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        {vol ? (
                          <div className="text-xs text-gray-500">
                            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                              {vol.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            {vol.nome.split(' ')[0]}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Aguardando voluntário</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Encerrados */}
        {encerrados.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm text-gray-500">Atendimentos encerrados</h3>
            <div className="space-y-2">
              {encerrados.map(a => (
                <div key={a.id} className="bg-gray-50 rounded-xl border border-gray-100 p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{nomePessoa(a)}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Encerrado</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info de contato */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-sm text-gray-600 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2">Precisa de ajuda?</h4>
          <p>Entre em contato com a equipe da Turma do Bem:</p>
          <div className="mt-2 space-y-1">
            <div>📍 Rua Maurício Francisco Klabin 449, Vila Mariana — SP</div>
            <div>📞 (11) 5084-7276</div>
          </div>
          <button onClick={() => navigate('/contato')} className="mt-3 bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Ir para página de contato
          </button>
        </div>
      </div>

      {/* Modal de chat */}
      {atendAberto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Atendimento #{atendAberto.id}</h3>
                <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-medium mt-0.5 ${badgeStatus(atendAberto.status)}`}>{atendAberto.status}</div>
              </div>
              <button onClick={() => setAtendAberto(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
                {atendAberto.mensagens.map((m, i) => {
                  const vol = atendAberto.voluntarioId ? state.voluntarios.find(v => v.id === atendAberto.voluntarioId) : null;
                  return (
                    <div key={i} className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${m.de === 'voluntario' ? 'bg-blue-600 text-white self-end rounded-br-sm' : 'bg-white border border-gray-200 self-start rounded-bl-sm'}`}>
                      {m.texto}
                      <div className={`text-[10px] mt-1 ${m.de === 'voluntario' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {m.de === 'voluntario' ? (vol?.nome ?? 'Voluntário') : user?.nome} · {m.hora}
                      </div>
                    </div>
                  );
                })}
                {atendAberto.mensagens.length === 0 && <span className="text-gray-400 text-xs m-auto">Nenhuma mensagem ainda.</span>}
              </div>
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
                <button onClick={sendMsg} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
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