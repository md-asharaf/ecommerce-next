const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👗" },
    { name: "Home", icon: "🛋️" },
    { name: "Beauty", icon: "💄" },
  ];
  
  const CategoryShortcuts = () => (
    <section className="flex justify-around items-center py-6">
      {categories.map((cat) => (
        <div key={cat.name} className="text-center space-y-1">
          <div className="text-4xl">{cat.icon}</div>
          <div className="text-sm font-medium">{cat.name}</div>
        </div>
      ))}
    </section>
  );
  
  export default CategoryShortcuts;
  