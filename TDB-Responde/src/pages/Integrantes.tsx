import Button from "../components/ui/Button";
interface Member {
  name: string;
  rm: string;
  course: string;
  image: string;
  github: string;
  linkedin: string;
}

function Integrantes() {
  const members: Member[] = [
    {
      name: 'Alisson Kawan',
      rm: '567598',
      course: '1TDSPS',
      image: '/public/img/alisson.jpeg',
      github: 'https://github.com/AlissonKawan',
      linkedin: 'https://www.linkedin.com/in/alisson-kawan-evangelista-silva-5a3355219/'
    },
    {
      name: 'Marcos Vinicius',
      rm: '567214',
      course: '1TDSPS',
      image: '/img/marcos.jpeg',
      github: 'https://github.com/marcos-thebest',
      linkedin: 'https://www.linkedin.com/in/marcos-vinicius-de-jesus-almeida/'
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Nossa Equipe</h2>
        <p className="text-gray-600 mt-2 text-2xl">Conheça os criadores do <span className="text-blue-600">TDB Responde</span></p>
      </section>

      {/* Cards */}
      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m) => (
            <div key={m.rm} className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
              
              {/* Foto */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 transition-transform duration-300 hover:scale-125">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-125">{m.name}</h3>
              <p className="text-blue-600 font-medium transition-transform duration-300 hover:scale-125">RM: {m.rm}</p>
              <p className="text-gray-500 text-sm mb-4 transition-transform duration-300 hover:scale-125">{m.course}</p>

              {/* Links */}
              <div className="flex gap-4 justify-center">
                <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-transform duration-300 hover:scale-125">
                  GitHub
                </a>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-transform duration-300 hover:scale-125">
                  LinkedIn
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vamos conversar?</h3>
          <p className="text-gray-600 mb-4">Entre em contato conosco</p>
         <Button href="/contato" variant="primary" size="large">
              Fale Conosco!
            </Button>
        </div>
      </section>
    </div>
  );
}

export default Integrantes;