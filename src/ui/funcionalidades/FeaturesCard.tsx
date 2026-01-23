interface FeatureCardProps {
  title: string;
  description: string[];
}

export default function FeaturesCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col h-full hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 flex-1">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
