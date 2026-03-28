// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';

interface FormData {
  usuario: string;
  senha: string;
}

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  if (user) {
    return <Navigate to={user.tipo === 'voluntario' ? '/admin' : '/portal'} replace />;
  }

  const onSubmit = (data: FormData) => {
    setErro('');
    setLoading(true);
    setTimeout(() => {
      const resultado = login(data.usuario, data.senha);
      setLoading(false);
      if (resultado === 'voluntario') navigate('/admin');
      else if (resultado === 'beneficiario') navigate('/portal');
      else setErro('Usuário ou senha inválidos. Tente novamente.');
    }, 600);
  };

  const preencher = (usuario: string, senha: string) => {
    setValue('usuario', usuario);
    setValue('senha', senha);
  };

  const voluntarios = [
    { usuario: 'ana.souza',     senha: '123456', nome: 'Ana Souza',     area: 'Odontologia',        sigilo: true  },
    { usuario: 'carlos.lima',   senha: '123456', nome: 'Carlos Lima',   area: 'Assistência Social', sigilo: false },
    { usuario: 'beatriz.nunes', senha: '123456', nome: 'Beatriz Nunes', area: 'Psicologia',         sigilo: true  },
  ];

  const beneficiarios = [
    { usuario: 'CA-2024-001', senha: '1234', nome: 'Código CA-2024-001', desc: 'Criança · 12 anos · EMEF Liberdade'    },
    { usuario: 'CA-2024-002', senha: '1234', nome: 'Código CA-2024-002', desc: 'Criança · 9 anos · EMEF Jardins'       },
    { usuario: 'VIOLETA-07',  senha: '1234', nome: 'VIOLETA-07',         desc: 'Mulher Apolônia · Risco alto'           },
    { usuario: 'ROSA-14',     senha: '1234', nome: 'ROSA-14',            desc: 'Mulher Apolônia · Risco médio'          },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Acesso ao Sistema</h2>
        <p className="text-gray-600 mt-2 text-xl">
          Entre com suas credenciais para acessar o{' '}
          <span className="text-blue-600 font-semibold">TDB Responde</span>
        </p>
      </section>

      <section className="py-8 max-w-3xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Coluna esquerda: formulário */}
          <div>
            {erro && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                ❌ {erro}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 bg-white p-8 rounded-lg shadow-md border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 text-lg mb-2">Entrar</h3>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Usuário</label>
                <input
                  {...register('usuario', { required: 'Digite seu usuário' })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.usuario ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Ex: ana.souza ou CA-2024-001"
                  autoComplete="username"
                />
                {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Senha</label>
                <input
                  type="password"
                  {...register('senha', { required: 'Digite sua senha' })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.senha ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Perfis */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs text-gray-500">
              <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                <div className="text-xl mb-1">🙋</div>
                <div className="font-semibold text-gray-700">Voluntário</div>
                <div>Painel de administração</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                <div className="text-xl mb-1">💙</div>
                <div className="font-semibold text-gray-700">Beneficiário</div>
                <div>Portal de atendimento</div>
              </div>
            </div>
          </div>

          {/* Coluna direita: acessos rápidos */}
          <div className="space-y-4">

            {/* Voluntários */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Voluntários — acesso ao painel
              </p>
              <div className="space-y-2">
                {voluntarios.map(v => (
                  <button
                    key={v.usuario}
                    type="button"
                    onClick={() => preencher(v.usuario, v.senha)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{v.nome}</p>
                      <p className="text-xs text-gray-500">{v.area}{v.sigilo ? ' · 🔒 Sigilo' : ''}</p>
                    </div>
                    <span className="text-xs text-blue-500 font-medium shrink-0 ml-2">usar →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Beneficiários */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Beneficiários — acesso ao portal
              </p>
              <div className="space-y-2">
                {beneficiarios.map(b => (
                  <button
                    key={b.usuario}
                    type="button"
                    onClick={() => preencher(b.usuario, b.senha)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{b.nome}</p>
                      <p className="text-xs text-gray-500">{b.desc}</p>
                    </div>
                    <span className="text-xs text-blue-500 font-medium shrink-0 ml-2">usar →</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;