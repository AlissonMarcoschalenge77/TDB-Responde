import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

function Contato() {
  const [enviado, setEnviado] = useState(false);
  
  // useEffect simples - só para cumprir o requisito
  useEffect(() => {
    console.log('Página Contato carregada!');
  }, []);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    // Aqui seria legal enviar para um servidor, mas por enquanto ta só no console mesmo 😔
    console.log('Nome:', data.nome);
    console.log('Email:', data.email);
    console.log('Mensagem:', data.mensagem);
    
    // Mostra mensagem de sucesso e limpa formulário
    setEnviado(true);
    reset();
    
    // Esconde mensagem após 3 segundos
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div>
      {/* Principal */}
      <section className="bg-blue-50 py-9 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Entre em Contato</h2>
        <p className=" text-2xl text-gray-600 mt-2">Fale conosco para saber mais sobre o projeto</p>
      </section>

      {/* Formulário */}
      <section className="py-4 max-w-xl mx-auto px-4">
        
        {/* Mensagem de sucesso */}
        {enviado && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
            ✅ Mensagem enviada com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md border border-gray-100">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input 
              {...register('nome', { required: 'Digite seu nome completo' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Ex: João Silva"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">E-mail</label>
            <input 
              type="email"
              {...register('email', { 
                required: 'Digite um e-mail válido',
                pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' }
              })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Ex: joao@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Mensagem</label>
            <textarea 
              rows={4}
              {...register('mensagem', { required: 'Digite sua mensagem' })}
              className={`w-full px-3 py-2 border rounded-lg resize-none ${errors.mensagem ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Ex: Olá, gostaria de saber mais sobre o projeto..."
            />
            {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Enviar Mensagem
          </button>

        </form>
      </section>
    </div>
  );
}
export default Contato;