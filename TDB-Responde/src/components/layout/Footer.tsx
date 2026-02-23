function Footer() {
  const links = [
    { name: "GitHub", url: "https://github.com/AlissonMarcoschalenge77" },
    {
      name: "Linkedin Alisson",
      url: "https://www.linkedin.com/in/alisson-kawan-evangelista-silva-5a3355219/",
    },
    {
      name: "Linkedin Marcos",
      url: "https://www.linkedin.com/in/marcos-vinicius-de-jesus-almeida/",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white p-6 text-center">
      <p className="mb-4">
        &copy; 2025 TDB Responde | Criado com dedicação pela dupla Alisson e
        Marcos
      </p>

      {/*Fazendo um laço de repetição com o map para percorrer a lista de links */}
      <div className="flex gap-4 justify-center flex-wrap">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            //fazer o usuario ir para outra guia
            target="_blank"
            //proteção para a guia seguinte não ter acesso a seu site
            rel="noopener noreferrer"
            //estilização
            className="text-blue-400 hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
