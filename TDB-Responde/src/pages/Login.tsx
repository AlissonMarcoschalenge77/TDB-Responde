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

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Se já estiver logado, redireciona
  if (user) {
    return <Navigate to={user.tipo === 'voluntario' ? '/admin' : '/portal'} replace />;
  }

  const onSubmit = (data: FormData) => {
    setErro('');
    setLoading(true);

    // Simula delay de rede
    setTimeout(() => {
      const resultado = login(data.usuario, data.senha);
      setLoading(false);

      if (resultado === 'voluntario') navigate('/admin');
      else if (resultado === 'beneficiario') navigate('/portal');
      else setErro('Usuário ou senha inválidos. Tente novamente.');
    }, 600);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Acesso ao Sistema</h2>
        <p className="text-gray-600 mt-2 text-xl">
          Entre com suas credenciais para acessar o <span className="text-blue-600 font-semibold">TDB Responde</span>
        </p>
      </section>

      {/* Formulário */}
      <section className="py-8 max-w-md mx-auto px-4">

        {/* Dica visual para demo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
          <p className="font-semibold mb-1">👤 Credenciais de demonstração (voluntários):</p>
          <ul className="space-y-1 text-xs">
            <li>• <b>ana.souza</b> / 123456 → Odontologia (acesso a sigilo)</li>
            <li>• <b>carlos.lima</b> / 123456 → Assistência Social</li>
            <li>• <b>beatriz.nunes</b> / 123456 → Psicologia</li>
          </ul>
          <p className="mt-2 text-xs text-blue-700">
            Qualquer outro login válido (mín. 3 caracteres / senha 4) entra como <b>beneficiário</b>.
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ❌ {erro}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Usuário</label>
            <input
              {...register('usuario', { required: 'Digite seu usuário' })}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.usuario ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Ex: ana.souza"
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

        {/* Dois perfis explicados */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center text-xs text-gray-500">
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="text-2xl mb-1">🙋</div>
            <div className="font-semibold text-gray-700">Voluntário</div>
            <div>Acessa o painel de administração e atendimentos</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="text-2xl mb-1">💙</div>
            <div className="font-semibold text-gray-700">Beneficiário</div>
            <div>Acessa o portal de acompanhamento</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;