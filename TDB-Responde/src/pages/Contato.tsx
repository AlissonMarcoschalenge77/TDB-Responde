import { useForm } from 'react-hook-form';

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

function Contato() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    // Aqui seria legal enviar para um servidor, mas por enquanto ta só no console mesmo 😔
    console.log('Nome:', data.nome);
    console.log('Email:', data.email);
    console.log('Mensagem:', data.mensagem);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
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
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Enviar
      </button>

    </form>
  );
}

  export default Contato;