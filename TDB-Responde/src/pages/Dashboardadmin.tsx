// src/pages/DashboardAdmin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { loadTDBState, saveTDBState } from '../context/tdbStorage';
import type {
  TDBState, Atendimento, Voluntario,
  StatusAtendimento, TipoPessoa,
  CriancaAdolescente, MulherApolonia,
  SolicitacaoVoluntario,
} from '../types';

function badgeStatus(s: StatusAtendimento) {
  const map: Record<StatusAtendimento, string> = {
    'Aberto':       'bg-blue-100 text-blue-800',
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Aguardando':   'bg-purple-100 text-purple-800',
    'Encerrado':    'bg-green-100 text-green-800',
  };
  return map[s] ?? 'bg-gray-100 text-gray-700';
}

function badgePrio(p: number) {
  if (p === 3) return 'bg-red-100 text-red-800';
  if (p === 2) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-700';
}

function prioLabel(p: number) { return p === 3 ? 'Alta' : p === 2 ? 'Média' : 'Baixa'; }

function nomePessoa(a: Atendimento) {
  return a.tipo === 'crianca'
    ? (a.pessoa as CriancaAdolescente).nomeCodificado
    : (a.pessoa as MulherApolonia).codinome;
}

function ModalAtendimento({ atend, state, onClose, onSave }: {
  atend: Atendimento; state: TDBState;
  onClose: () => void; onSave: (u: Atendimento) => void;
}) {
  const { user } = useAuth();
  const [local, setLocal] = useState<Atendimento>({ ...atend, mensagens: [...atend.mensagens], historico: [...atend.historico] });
  const [chatInput, setChatInput] = useState('');
  const vol = local.voluntarioId ? state.voluntarios.find(v => v.id === local.voluntarioId) : null;
  const nome = nomePessoa(local);
  const isCrianca = local.tipo === 'crianca';
  const pessoaC = local.pessoa as CriancaAdolescente;
  const pessoaM = local.pessoa as MulherApolonia;

  const changeStatus = (novoStatus: StatusAtendimento) => {
    if (local.status === novoStatus) return;
    const agora = new Date().toLocaleString('pt-BR').replace(',', '');
    const updated = { ...local, status: novoStatus, historico: [...local.historico, { statusAnterior: local.status, statusNovo: novoStatus, alteradoPor: user?.nome ?? 'Voluntário', dataHora: agora }] };
    setLocal(updated); onSave(updated);
  };

  const changeVol = (id: string) => {
    const updated = { ...local, voluntarioId: id ? parseInt(id) : null };
    setLocal(updated); onSave(updated);
  };

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const updated = { ...local, mensagens: [...local.mensagens, { de: 'voluntario' as const, texto: chatInput.trim(), hora }] };
    setLocal(updated); onSave(updated); setChatInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-4 shadow-xl">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Atendimento #{local.id} — {nome}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {isCrianca ? (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Criança / Adolescente</span>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div><b>Código:</b> {pessoaC.nomeCodificado}</div>
                <div><b>Idade:</b> {pessoaC.idade} anos</div>
                <div><b>Responsável:</b> {pessoaC.responsavel}</div>
                <div><b>Escola:</b> {pessoaC.escola}</div>
                <div><b>Telefone:</b> {pessoaC.telefone || '—'}</div>
                <div><b>E-mail:</b> {pessoaC.email || '—'}</div>
              </div>
              <div className="mt-2 text-sm">
                <b>Gravidade bucal ({pessoaC.gravidadeBucal}/5):</b>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className={`w-5 h-5 rounded border ${i < pessoaC.gravidadeBucal ? 'bg-red-400 border-red-500' : 'bg-white border-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={`rounded-xl p-4 border ${pessoaM.sigiloAbsoluto ? 'bg-red-50 border-red-200' : 'bg-pink-50 border-pink-100'}`}>
              {pessoaM.sigiloAbsoluto && (
                <div className="flex items-center gap-2 text-red-700 font-bold text-xs mb-2 bg-red-100 px-3 py-1.5 rounded-lg border border-red-200">
                  🔒 SIGILO ABSOLUTO — acesso restrito a voluntários autorizados
                </div>
              )}
              <span className="text-xs font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">Mulher Apolônia</span>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div><b>Codinome:</b> {pessoaM.codinome}</div>
                <div><b>Nível de risco:</b> {pessoaM.nivelRisco >= 3 ? '🔴 Alto' : pessoaM.nivelRisco === 2 ? '🟡 Médio' : '🟢 Baixo'}</div>
                <div><b>Boletim:</b> {pessoaM.temBoletim ? 'Sim' : 'Não'}</div>
                <div><b>Sigilo absoluto:</b> {pessoaM.sigiloAbsoluto ? 'Sim' : 'Não'}</div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select value={local.status} onChange={e => changeStatus(e.target.value as StatusAtendimento)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {(['Aberto', 'Em andamento', 'Aguardando', 'Encerrado'] as StatusAtendimento[]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Voluntário</label>
              <select value={local.voluntarioId ?? ''} onChange={e => changeVol(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Sem voluntário</option>
                {state.voluntarios.map(v => <option key={v.id} value={v.id}>{v.nome}</option>)}
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Chat do atendimento</p>
            <div className="h-52 overflow-y-auto flex flex-col gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
              {local.mensagens.map((m, i) => (
                <div key={i} className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-snug ${m.de === 'voluntario' ? 'bg-blue-600 text-white self-end rounded-br-sm' : 'bg-white border border-gray-200 self-start rounded-bl-sm'}`}>
                  {m.texto}
                  <div className={`text-[10px] mt-1 ${m.de === 'voluntario' ? 'text-blue-200' : 'text-gray-400'}`}>
                    {m.de === 'voluntario' ? (vol?.nome ?? user?.nome ?? 'Voluntário') : nome} · {m.hora}
                  </div>
                </div>
              ))}
              {local.mensagens.length === 0 && <span className="text-gray-400 text-xs m-auto">Nenhuma mensagem ainda.</span>}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Responder como voluntário..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <button onClick={sendMsg} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Enviar</button>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Histórico de status</p>
            {local.historico.length === 0 ? <span className="text-gray-400 text-xs">Nenhuma alteração registrada.</span> : (
              <ul className="space-y-2">
                {local.historico.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-0.5 shrink-0 border-2 border-blue-200" />
                    <span><b>{h.statusAnterior}</b> → <b>{h.statusNovo}</b> por {h.alteradoPor} <span className="text-gray-400 ml-1">{h.dataHora}</span></span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Aba = 'dashboard' | 'atendimentos' | 'novo' | 'voluntarios' | 'inscricoes';

function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<TDBState>(() => loadTDBState());
  const [aba, setAba] = useState<Aba>('dashboard');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [atendSelecionado, setAtendSelecionado] = useState<Atendimento | null>(null);
  const [step, setStep] = useState(1);
  const [novoTipo, setNovoTipo] = useState<TipoPessoa | null>(null);
  const [formPessoa, setFormPessoa] = useState<Record<string, string>>({});
  const [formAtend, setFormAtend] = useState({ canal: 'WhatsApp', prioridade: '2', voluntarioId: '', mensagem: '' });
  const [formSucesso, setFormSucesso] = useState('');
  const [formErro, setFormErro] = useState('');
  const [volForm, setVolForm] = useState({ nome: '', usuario: '', senha: '', especialidade: 'Odontologia', disponivel: 'true', acessoSigilo: 'false' });
  const [volSucesso, setVolSucesso] = useState('');
  const [volErro, setVolErro] = useState('');

  const saveState = (s: TDBState) => { setState(s); saveTDBState(s); };
  const updateAtend = (updated: Atendimento) => saveState({ ...state, atendimentos: state.atendimentos.map(a => a.id === updated.id ? updated : a) });

  const atendFiltrados = state.atendimentos.filter(a => {
    const passaStatus = filtroStatus === 'todos' || a.status === filtroStatus;
    const nome = nomePessoa(a).toLowerCase();
    const vol = a.voluntarioId ? (state.voluntarios.find(v => v.id === a.voluntarioId)?.nome ?? '').toLowerCase() : '';
    const passaBusca = !busca || nome.includes(busca.toLowerCase()) || a.canal.toLowerCase().includes(busca.toLowerCase()) || vol.includes(busca.toLowerCase());
    return passaStatus && passaBusca;
  });

  const total = state.atendimentos.length;
  const abertos = state.atendimentos.filter(a => a.status === 'Aberto').length;
  const andamento = state.atendimentos.filter(a => a.status === 'Em andamento').length;
  const encerrados = state.atendimentos.filter(a => a.status === 'Encerrado').length;

  const solicitacoes: SolicitacaoVoluntario[] = state.solicitacoesVoluntario ?? [];
  const pendentes = solicitacoes.filter(s => s.status === 'pendente');

  const aprovar = (id: number) => {
    const sol = solicitacoes.find(s => s.id === id);
    if (!sol) return;
    const novoId = Math.max(...state.voluntarios.map(v => v.id), 0) + 1;
    const usuario = sol.nome.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const novoVol: Voluntario = { id: novoId, nome: sol.nome, usuario, senha: '123456', especialidade: sol.especialidade, disponivel: true, acessoSigilo: false };
    const novasSol: SolicitacaoVoluntario[] = solicitacoes.map(s => s.id === id ? { ...s, status: 'aprovado' as const } : s);
    saveState({ ...state, voluntarios: [...state.voluntarios, novoVol], solicitacoesVoluntario: novasSol });
  };

  const rejeitar = (id: number) => {
    const novasSol: SolicitacaoVoluntario[] = solicitacoes.map(s => s.id === id ? { ...s, status: 'rejeitado' as const } : s);
    saveState({ ...state, solicitacoesVoluntario: novasSol });
  };

  const submitAtend = () => {
    setFormErro('');
    if (novoTipo === 'crianca' && !formPessoa.nomeCodificado) { setFormErro('Preencha o código da criança.'); return; }
    if (novoTipo === 'mulher' && !formPessoa.codinome) { setFormErro('Preencha o codinome.'); return; }
    const hoje = new Date().toISOString().slice(0, 10);
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const novoId = state.nextId;
    const pessoa = novoTipo === 'crianca'
      ? { nomeCodificado: formPessoa.nomeCodificado, idade: parseInt(formPessoa.idade || '0'), responsavel: formPessoa.responsavel || '', escola: formPessoa.escola || '', telefone: formPessoa.telefone || '', email: formPessoa.email || '', gravidadeBucal: parseInt(formPessoa.gravidadeBucal || '1') }
      : { codinome: formPessoa.codinome, nivelRisco: parseInt(formPessoa.nivelRisco || '1'), telefone: formPessoa.telefone || '', email: formPessoa.email || '', temBoletim: formPessoa.temBoletim === 'true', sigiloAbsoluto: formPessoa.sigiloAbsoluto === 'true' };
    const novoAtend: Atendimento = { id: novoId, tipo: novoTipo!, pessoa, canal: formAtend.canal, prioridade: parseInt(formAtend.prioridade) as 1 | 2 | 3, status: 'Aberto', voluntarioId: formAtend.voluntarioId ? parseInt(formAtend.voluntarioId) : null, dataAbertura: hoje, mensagens: formAtend.mensagem ? [{ de: 'pessoa', texto: formAtend.mensagem, hora }] : [], historico: [] };
    saveState({ ...state, nextId: state.nextId + 1, atendimentos: [novoAtend, ...state.atendimentos] });
    setFormSucesso(`✅ Atendimento #${novoId} aberto!`);
    setTimeout(() => { setFormSucesso(''); setAba('atendimentos'); setStep(1); setNovoTipo(null); setFormPessoa({}); setFormAtend({ canal: 'WhatsApp', prioridade: '2', voluntarioId: '', mensagem: '' }); }, 1800);
  };

  const submitVol = () => {
    setVolErro('');
    if (!volForm.nome.trim() || !volForm.usuario.trim() || volForm.senha.length < 6) { setVolErro('Preencha todos os campos. Senha mínimo 6 caracteres.'); return; }
    if (state.voluntarios.find(v => v.usuario === volForm.usuario.trim())) { setVolErro('Usuário já cadastrado.'); return; }
    const novoVol: Voluntario = { id: Math.max(...state.voluntarios.map(v => v.id), 0) + 1, nome: volForm.nome.trim(), usuario: volForm.usuario.trim(), senha: volForm.senha, especialidade: volForm.especialidade, disponivel: volForm.disponivel === 'true', acessoSigilo: volForm.acessoSigilo === 'true' };
    saveState({ ...state, voluntarios: [...state.voluntarios, novoVol] });
    setVolSucesso('✅ Voluntário cadastrado!');
    setVolForm({ nome: '', usuario: '', senha: '', especialidade: 'Odontologia', disponivel: 'true', acessoSigilo: 'false' });
    setTimeout(() => setVolSucesso(''), 3000);
  };

  const abas: [Aba, string][] = [
    ['dashboard', 'Dashboard'],
    ['atendimentos', 'Atendimentos'],
    ['novo', '+ Novo'],
    ['voluntarios', 'Voluntários'],
    ['inscricoes', pendentes.length > 0 ? `Inscrições (${pendentes.length})` : 'Inscrições'],
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-blue-200 hover:text-white text-sm transition-colors">
            ← Página principal
          </button>
          <span className="text-blue-400">|</span>
          <span className="text-sm font-semibold">Painel do Voluntário</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{user?.nome}</span>
          {user?.acessoSigilo && <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full">🔒 Sigilo</span>}
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} className="text-xs text-blue-200 hover:text-white transition-colors">
          Sair →
        </button>
      </div>

      {/* Hero */}
      <section className="bg-blue-50 py-8 text-center border-b border-blue-100">
        <h2 className="text-3xl font-bold text-gray-800">
          Olá, <span className="text-blue-600">{user?.nome}</span>
        </h2>
        <p className="text-gray-500 mt-1">Gerencie atendimentos e voluntários da Turma do Bem</p>
      </section>

      {/* Abas */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-6xl mx-auto flex overflow-x-auto">
          {abas.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setAba(id)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                aba === id ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-800'
              } ${id === 'inscricoes' && pendentes.length > 0 ? 'text-yellow-600' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* DASHBOARD */}
        {aba === 'dashboard' && (
          <div className="space-y-8">
            {pendentes.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
                <p className="text-sm text-yellow-800 font-medium">⏳ {pendentes.length} inscrição(ões) de voluntário aguardando aprovação</p>
                <button onClick={() => setAba('inscricoes')} className="text-sm text-yellow-700 font-semibold hover:underline">Ver inscrições →</button>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {([['Total', total, 'text-gray-800', 'border-gray-200'], ['Abertos', abertos, 'text-blue-600', 'border-blue-200'], ['Em andamento', andamento, 'text-yellow-600', 'border-yellow-200'], ['Encerrados', encerrados, 'text-green-600', 'border-green-200']] as [string, number, string, string][]).map(([l, v, c, b]) => (
                <div key={l} className={`bg-white rounded-lg border-2 ${b} p-5 text-center shadow-sm`}>
                  <div className={`text-4xl font-bold ${c}`}>{v}</div>
                  <div className="text-sm text-gray-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Atendimentos urgentes</h3>
              {state.atendimentos.filter(a => a.prioridade === 3 && a.status !== 'Encerrado').length === 0 ? (
                <p className="text-gray-400 text-sm">Nenhum atendimento urgente no momento.</p>
              ) : (
                <div className="space-y-3">
                  {state.atendimentos.filter(a => a.prioridade === 3 && a.status !== 'Encerrado').map(a => {
                    const vol = a.voluntarioId ? state.voluntarios.find(v => v.id === a.voluntarioId)?.nome : null;
                    return (
                      <div key={a.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                        <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">ALTA</span>
                        <span className="font-semibold text-sm text-gray-800">{nomePessoa(a)}</span>
                        <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{a.canal}</span>
                        <span className="text-xs text-gray-400">→ {vol ?? 'Sem voluntário'}</span>
                        <button onClick={() => setAtendSelecionado(a)} className="ml-auto text-xs text-blue-600 font-semibold hover:underline">Abrir →</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Atendimentos por canal</h3>
                <div className="space-y-3">
                  {['WhatsApp', 'E-mail', 'Instagram', 'Telefone', 'Presencial'].map(canal => {
                    const n = state.atendimentos.filter(a => a.canal === canal).length;
                    const pct = total ? Math.round((n / total) * 100) : 0;
                    return (
                      <div key={canal} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-24 shrink-0">{canal}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                        <span className="text-sm font-semibold text-gray-700 w-4">{n}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Por tipo de pessoa</h3>
                <div className="space-y-3">
                  {[['crianca', 'Criança / Adolescente', 'bg-blue-500'], ['mulher', 'Mulher Apolônia', 'bg-pink-500']].map(([tipo, label, cor]) => {
                    const n = state.atendimentos.filter(a => a.tipo === tipo).length;
                    const pct = total ? Math.round((n / total) * 100) : 0;
                    return (
                      <div key={tipo} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-36 shrink-0">{label}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2"><div className={`${cor} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} /></div>
                        <span className="text-sm font-semibold text-gray-700 w-4">{n}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ATENDIMENTOS */}
        {aba === 'atendimentos' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por nome, canal ou voluntário..." className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72" />
              <div className="flex gap-2 flex-wrap">
                {['todos', 'Aberto', 'Em andamento', 'Aguardando', 'Encerrado'].map(f => (
                  <button key={f} onClick={() => setFiltroStatus(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filtroStatus === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                    {f === 'todos' ? 'Todos' : f}
                  </button>
                ))}
              </div>
              <button onClick={() => setAba('novo')} className="ml-auto bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">+ Novo atendimento</button>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Pessoa</th>
                    <th className="px-4 py-3 text-left">Canal</th>
                    <th className="px-4 py-3 text-left">Prioridade</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Voluntário</th>
                    <th className="px-4 py-3 text-left">Abertura</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {atendFiltrados.length === 0 && <tr><td colSpan={8} className="text-center text-gray-400 py-12 text-sm">Nenhum atendimento encontrado.</td></tr>}
                  {atendFiltrados.map(a => {
                    const vol = a.voluntarioId ? state.voluntarios.find(v => v.id === a.voluntarioId)?.nome : '—';
                    const isMulherSigilo = a.tipo === 'mulher' && (a.pessoa as MulherApolonia).sigiloAbsoluto;
                    return (
                      <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs">#{a.id}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">{nomePessoa(a)}</div>
                          <div className="flex gap-1 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${a.tipo === 'crianca' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>{a.tipo === 'crianca' ? 'Criança' : 'Mulher'}</span>
                            {isMulherSigilo && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">🔒 Sigilo</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">{a.canal}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgePrio(a.prioridade)}`}>{prioLabel(a.prioridade)}</span></td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStatus(a.status)}`}>{a.status}</span></td>
                        <td className="px-4 py-3 text-xs text-gray-500">{vol ?? '—'}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{a.dataAbertura}</td>
                        <td className="px-4 py-3"><button onClick={() => setAtendSelecionado(a)} className="text-xs text-blue-600 font-semibold hover:underline">Ver →</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* NOVO ATENDIMENTO */}
        {aba === 'novo' && (
          <div className="max-w-xl space-y-4">
            {formSucesso && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">{formSucesso}</div>}
            {formErro   && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{formErro}</div>}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Tipo de pessoa atendida</h3>
                <p className="text-gray-500 text-sm mb-5">Selecione o perfil da pessoa que será atendida</p>
                <div className="grid grid-cols-2 gap-4">
                  {([['crianca', '🧒', 'Criança / Adolescente', 'Saúde bucal e escola'], ['mulher', '🌸', 'Mulher Apolônia', 'Protocolo sigiloso']] as [TipoPessoa, string, string, string][]).map(([tipo, icon, title, sub]) => (
                    <button key={tipo} onClick={() => { setNovoTipo(tipo); setStep(2); setFormPessoa({}); }} className={`p-6 rounded-lg border-2 text-left transition-all hover:border-blue-400 hover:bg-blue-50 ${novoTipo === tipo ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                      <div className="text-3xl mb-3">{icon}</div>
                      <div className="font-bold text-gray-800">{title}</div>
                      <div className="text-xs text-gray-500 mt-1">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && novoTipo && (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 space-y-3">
                <h3 className="font-bold text-gray-800 mb-1 text-lg">{novoTipo === 'crianca' ? 'Dados da Criança / Adolescente' : 'Dados da Mulher Apolônia'}</h3>
                {novoTipo === 'crianca' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Código *</label><input value={formPessoa.nomeCodificado ?? ''} onChange={e => setFormPessoa({ ...formPessoa, nomeCodificado: e.target.value })} placeholder="CA-2025-001" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Idade</label><input type="number" min="1" max="18" value={formPessoa.idade ?? ''} onChange={e => setFormPessoa({ ...formPessoa, idade: e.target.value })} placeholder="10" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Responsável</label><input value={formPessoa.responsavel ?? ''} onChange={e => setFormPessoa({ ...formPessoa, responsavel: e.target.value })} placeholder="Nome do responsável" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Escola</label><input value={formPessoa.escola ?? ''} onChange={e => setFormPessoa({ ...formPessoa, escola: e.target.value })} placeholder="Nome da escola" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Telefone</label><input value={formPessoa.telefone ?? ''} onChange={e => setFormPessoa({ ...formPessoa, telefone: e.target.value })} placeholder="(11) 9 0000-0000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">E-mail</label><input value={formPessoa.email ?? ''} onChange={e => setFormPessoa({ ...formPessoa, email: e.target.value })} placeholder="responsavel@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                    </div>
                    <div><label className="text-xs font-semibold text-gray-600 block mb-1">Gravidade bucal</label>
                      <select value={formPessoa.gravidadeBucal ?? '1'} onChange={e => setFormPessoa({ ...formPessoa, gravidadeBucal: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                        {[['1', '1 — Leve'], ['2', '2 — Moderada'], ['3', '3 — Séria'], ['4', '4 — Grave'], ['5', '5 — Muito grave']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">🔒 Nunca registre o nome real. Use apenas o codinome.</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Codinome *</label><input value={formPessoa.codinome ?? ''} onChange={e => setFormPessoa({ ...formPessoa, codinome: e.target.value })} placeholder="Ex: VIOLETA-08" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Nível de risco</label>
                        <select value={formPessoa.nivelRisco ?? '1'} onChange={e => setFormPessoa({ ...formPessoa, nivelRisco: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                          {[['1', '1 — Baixo'], ['2', '2 — Médio'], ['3', '3 — Alto'], ['4', '4 — Muito alto'], ['5', '5 — Crítico']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Tem boletim?</label><select value={formPessoa.temBoletim ?? 'false'} onChange={e => setFormPessoa({ ...formPessoa, temBoletim: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="false">Não</option><option value="true">Sim</option></select></div>
                      <div><label className="text-xs font-semibold text-gray-600 block mb-1">Sigilo absoluto?</label><select value={formPessoa.sigiloAbsoluto ?? 'false'} onChange={e => setFormPessoa({ ...formPessoa, sigiloAbsoluto: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="false">Não</option><option value="true">Sim</option></select></div>
                    </div>
                  </>
                )}
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Voltar</button>
                  <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Próximo</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 space-y-3">
                <h3 className="font-bold text-gray-800 mb-1 text-lg">Dados do atendimento</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-semibold text-gray-600 block mb-1">Canal</label>
                    <select value={formAtend.canal} onChange={e => setFormAtend({ ...formAtend, canal: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                      {['WhatsApp', 'E-mail', 'Instagram', 'Telefone', 'Presencial'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className="text-xs font-semibold text-gray-600 block mb-1">Prioridade</label>
                    <select value={formAtend.prioridade} onChange={e => setFormAtend({ ...formAtend, prioridade: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                      <option value="1">1 — Baixa</option><option value="2">2 — Média</option><option value="3">3 — Alta (urgente)</option>
                    </select>
                  </div>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Voluntário responsável</label>
                  <select value={formAtend.voluntarioId} onChange={e => setFormAtend({ ...formAtend, voluntarioId: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">— Não atribuído —</option>
                    {state.voluntarios.filter(v => v.disponivel).map(v => <option key={v.id} value={v.id}>{v.nome} ({v.especialidade})</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Mensagem inicial</label>
                  <textarea value={formAtend.mensagem} onChange={e => setFormAtend({ ...formAtend, mensagem: e.target.value })} placeholder="Descreva brevemente a demanda..." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Voltar</button>
                  <button onClick={submitAtend} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Abrir Atendimento</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VOLUNTÁRIOS */}
        {aba === 'voluntarios' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Voluntários cadastrados</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3 text-left">Nome</th>
                    <th className="px-5 py-3 text-left">Usuário</th>
                    <th className="px-5 py-3 text-left">Especialidade</th>
                    <th className="px-5 py-3 text-left">Disponível</th>
                    <th className="px-5 py-3 text-left">Sigilo</th>
                    <th className="px-5 py-3 text-left">Atendimentos</th>
                  </tr>
                </thead>
                <tbody>
                  {state.voluntarios.map(v => (
                    <tr key={v.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800">{v.nome}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{v.usuario}</td>
                      <td className="px-5 py-3"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{v.especialidade}</span></td>
                      <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{v.disponivel ? 'Sim' : 'Não'}</span></td>
                      <td className="px-5 py-3">{v.acessoSigilo ? <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">🔒 Sim</span> : <span className="text-gray-400 text-xs">—</span>}</td>
                      <td className="px-5 py-3 font-bold text-gray-800">{state.atendimentos.filter(a => a.voluntarioId === v.id).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 max-w-xl">
              <h3 className="font-bold text-gray-800 mb-1 text-lg">Cadastrar voluntário manualmente</h3>
              <p className="text-gray-500 text-sm mb-5">Para inscrições via formulário público, veja a aba Inscrições</p>
              {volSucesso && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm mb-3">{volSucesso}</div>}
              {volErro   && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm mb-3">{volErro}</div>}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Nome completo</label><input value={volForm.nome} onChange={e => setVolForm({ ...volForm, nome: e.target.value })} placeholder="Maria Costa" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Usuário (login)</label><input value={volForm.usuario} onChange={e => setVolForm({ ...volForm, usuario: e.target.value })} placeholder="maria.costa" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Senha</label><input type="password" value={volForm.senha} onChange={e => setVolForm({ ...volForm, senha: e.target.value })} placeholder="Mín. 6 caracteres" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Especialidade</label>
                  <select value={volForm.especialidade} onChange={e => setVolForm({ ...volForm, especialidade: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {['Odontologia', 'Assistência Social', 'Psicologia', 'Direito', 'Geral'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Disponível?</label><select value={volForm.disponivel} onChange={e => setVolForm({ ...volForm, disponivel: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="true">Sim</option><option value="false">Não</option></select></div>
                <div><label className="text-xs font-semibold text-gray-600 block mb-1">Acesso a sigilo?</label><select value={volForm.acessoSigilo} onChange={e => setVolForm({ ...volForm, acessoSigilo: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="false">Não</option><option value="true">Sim</option></select></div>
              </div>
              <button onClick={submitVol} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Salvar voluntário</button>
            </div>
          </div>
        )}

        {/* INSCRIÇÕES */}
        {aba === 'inscricoes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Inscrições de voluntários</h3>
                <p className="text-gray-500 text-sm mt-1">Candidatos que enviaram interesse via <strong>/quero-ser-voluntario</strong></p>
              </div>
              {pendentes.length > 0 && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full border border-yellow-200">{pendentes.length} pendente(s)</span>
              )}
            </div>
            {solicitacoes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-12 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="font-semibold text-gray-600">Nenhuma inscrição recebida ainda</p>
                <p className="text-gray-400 text-sm mt-2">Compartilhe o link <strong>/quero-ser-voluntario</strong> para receber candidatos</p>
              </div>
            ) : (
              <div className="space-y-4">
                {solicitacoes.map(s => (
                  <div key={s.id} className={`bg-white rounded-lg shadow-md border p-6 ${s.status === 'pendente' ? 'border-yellow-200' : s.status === 'aprovado' ? 'border-green-200' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-800 text-lg">{s.nome}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : s.status === 'aprovado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {s.status === 'pendente' ? '⏳ Pendente' : s.status === 'aprovado' ? '✅ Aprovado' : '❌ Rejeitado'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600 mb-3">
                          <div>📧 {s.email}</div>
                          <div>📞 {s.telefone}</div>
                          <div>🎓 {s.especialidade}</div>
                          <div>🕐 {s.disponibilidade}</div>
                          <div className="col-span-2 text-gray-400 text-xs">Enviado em {s.dataSolicitacao}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 border border-gray-100">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Motivação</span>
                          {s.motivacao}
                        </div>
                        {s.status === 'aprovado' && (
                          <p className="text-xs text-green-600 font-medium mt-2">✅ Login criado — usuário pode acessar com senha 123456</p>
                        )}
                      </div>
                      {s.status === 'pendente' && (
                        <div className="flex flex-col gap-2 shrink-0">
                          <button onClick={() => aprovar(s.id)} className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">✅ Aprovar</button>
                          <button onClick={() => rejeitar(s.id)} className="bg-white text-red-600 border border-red-200 text-sm px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">❌ Rejeitar</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {atendSelecionado && (
        <ModalAtendimento
          atend={atendSelecionado}
          state={state}
          onClose={() => setAtendSelecionado(null)}
          onSave={(updated) => { updateAtend(updated); setAtendSelecionado(updated); }}
        />
      )}
    </div>
  );
}

  export default DashboardAdmin;