interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  destaque?: boolean;
}

function FeatureCard({ icon, title, description, destaque = false }: FeatureCardProps) {
  return (
    <article 
      className={`p-6 rounded-lg shadow-2xl text-center border transition-transform duration-300 hover:scale-125 ${
        destaque 
          ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' 
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {destaque && (
        <span className="inline-block mt-3 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
          Destaque
        </span>
      )}
    </article>
  );
}

export default FeatureCard;