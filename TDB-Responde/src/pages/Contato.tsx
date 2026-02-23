import { useState, type FormEvent } from "react";

function Contato() {
  // Estados para guardar os valores do formulário
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Função chamada ao clicar em "Enviar"
  const Submit = (e: FormEvent) => {
    e.preventDefault(); // Função que Impede a página de recarregar

    if (!nome || !email || !mensagem) {
      setErro("Preencha todos os campos antes de enviar.");
      return; // PARA a função aqui
    }

    // Aqui seria legal enviar para um servidor, mas por enquanto ta só no console mesmo 😔
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Mensagem:", mensagem);

    // Mostra mensagem de sucesso
    setEnviado(true);

    // Mostra Mensagem de erro
    setErro("");

    // Limpa o formulário
    setNome("");
    setEmail("");
    setMensagem("");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">
            Entre em Contato
          </h2>
          <p className="text-gray-600 text-2xl">
            Fale conosco para saber mais sobre o projeto
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16 max-w-2xl mx-auto px-4">
        {enviado ? (
          // Mensagem de sucesso (aparece depois de enviar)
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
            <p className="font-bold">Mensagem enviada com sucesso!</p>
            <p>Entraremos em contato em breve.</p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-4 text-green-700 underline hover:no-underline"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          // Formulário (aparece inicialmente)
          <form
            onSubmit={Submit}
            className="bg-white p-8 rounded-lg shadow-md border border-gray-100 space-y-6"
          >
            {erro && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {erro}
              </div>
            )}
            {/* Campo Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-gray-700 font-medium mb-2"
              >
                Nome*
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Campo E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                E-mail*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="seu@email.com"
              />
            </div>

            {/* Campo Mensagem */}
            <div>
              <label
                htmlFor="mensagem"
                className="block text-gray-700 font-medium mb-2"
              >
                Mensagem*
              </label>
              <textarea
                id="mensagem"
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                placeholder="Sua mensagem..."
              />
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </section>

      {/* Informações de contato adicionais */}
      <section className="pb-16 max-w-2xl mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">E-mail</h3>
            <p className="text-gray-600">contato@tdbresponde.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-gray-600">(11) 99999-9999</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contato;
