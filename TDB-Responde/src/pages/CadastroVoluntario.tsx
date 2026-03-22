// src/pages/CadastroVoluntario.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loadTDBState, saveTDBState } from '../context/tdbStorage';
import type { SolicitacaoVoluntario } from '../types';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  motivacao: string;
  disponibilidade: string;
}

function gerarId(solicitacoes: SolicitacaoVoluntario[]): number {
  if (solicitacoes.length === 0) return 1;
  return Math.max(...solicitacoes.map(s => s.id)) + 1;
}

function dataHoje(): string {
  const d = new Date();
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function CadastroVoluntario() {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const state = loadTDBState();
    const solicitacoes = state.solicitacoesVoluntario ?? [];
    const nova: SolicitacaoVoluntario = {
      id: gerarId(solicitacoes),
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      especialidade: data.especialidade,
      motivacao: data.motivacao,
      disponibilidade: data.disponibilidade,
      status: 'pendente',
      dataSolicitacao: dataHoje(),
    };
    saveTDBState({ ...state, solicitacoesVoluntario: [...solicitacoes, nova] });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div>
        <section className="bg-blue-50 py-9 text-center">
          <h2 className="text-5xl font-bold text-gray-800">Inscrição enviada!</h2>
          <p className="text-2xl text-gray-600 mt-2">Obrigado pelo seu interesse em ajudar</p>
        </section>
        <section className="py-16 max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Recebemos sua inscrição!</h3>
            <p className="text-gray-600 mb-2">
              Sua solicitação foi registrada e será analisada pela equipe da <strong>Turma do Bem</strong>.
            </p>
            <p className="text-gray-600 mb-8">
              Entraremos em contato em breve pelo e-mail informado.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/')}
                className="inline-block rounded-xl font-semibold transition-colors duration-300 hover:scale-125 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
              >
                Voltar ao início
              </button>
              <button
                onClick={() => navigate('/sobre')}
                className="inline-block rounded-xl font-semibold transition-colors duration-300 hover:scale-125 bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 text-lg"
              >
                Conhecer o projeto
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-9 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Seja um Voluntário</h2>
        <p className="text-2xl text-gray-600 mt-2">
          Faça parte da <span className="text-blue-600">Turma do Bem</span> e transforme vidas
        </p>
      </section>

      {/* Cards de áreas */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Áreas que precisam de você
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {[
            { icon: '🦷', title: 'Odontologia',       desc: 'Atendimento bucal gratuito para crianças e adolescentes.' },
            { icon: '💙', title: 'Assistência Social', desc: 'Apoio, acolhimento e orientação às famílias atendidas.'     },
            { icon: '🧠', title: 'Psicologia',         desc: 'Suporte emocional e saúde mental para os beneficiários.'   },
            { icon: '⚖️', title: 'Direito',            desc: 'Orientação jurídica e defesa dos direitos dos assistidos.' },
          ].map((item) => (
            <article
              key={item.title}
              className="p-6 rounded-lg shadow-2xl text-center border bg-white border-gray-100 transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section className="py-4 max-w-xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Preencha sua inscrição
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
          {/* Nome */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nome completo</label>
            <input
              {...register('nome', { required: 'Digite seu nome completo' })}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Ex: Maria da Silva"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>

          {/* Email + Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">E-mail</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Digite um e-mail válido',
                  pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' },
                })}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Telefone</label>
              <input
                {...register('telefone', { required: 'Digite seu telefone' })}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.telefone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="(11) 9 0000-0000"
              />
              {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
            </div>
          </div>

          {/* Especialidade + Disponibilidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Área de atuação</label>
              <select
                {...register('especialidade', { required: 'Selecione uma área' })}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.especialidade ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Selecione...</option>
                {['Odontologia','Assistência Social','Psicologia','Direito','Educação','Tecnologia','Geral'].map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              {errors.especialidade && <p className="text-red-500 text-sm mt-1">{errors.especialidade.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Disponibilidade</label>
              <select
                {...register('disponibilidade', { required: 'Selecione sua disponibilidade' })}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.disponibilidade ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Selecione...</option>
                {['Manhãs','Tardes','Noites','Fins de semana','Flexível'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.disponibilidade && <p className="text-red-500 text-sm mt-1">{errors.disponibilidade.message}</p>}
            </div>
          </div>

          {/* Motivação */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Por que quer ser voluntário?</label>
            <textarea
              rows={4}
              {...register('motivacao', {
                required: 'Conte sua motivação',
                minLength: { value: 20, message: 'Mínimo 20 caracteres' },
              })}
              className={`w-full px-3 py-2 border rounded-lg resize-none text-sm ${errors.motivacao ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Conte um pouco sobre sua motivação para se tornar voluntário..."
            />
            {errors.motivacao && <p className="text-red-500 text-sm mt-1">{errors.motivacao.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Enviar inscrição
          </button>

          <p className="text-center text-xs text-gray-400 pt-1">
            Já é voluntário?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Acesse o sistema aqui
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}

export default CadastroVoluntario;