interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="bg-white p-6 rounded-lg shadow-2xl text-center border border-gray-100 transition-transform duration-300 hover:scale-125">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </article>
  );
}

export default FeatureCard;