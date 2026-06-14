function Instructions() {
  return (
    <div className="p-5 bg-yellow-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">How to use this app</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Type the name of a Harry Potter character in the search box.</li>
        <li>Click the <strong>Search</strong> button to fetch results.</li>
        <li>Filtered characters will appear in the grid below.</li>
        <li>Click on a card to see more details.</li>
      </ul>
    </div>
  );
}

export default Instructions;
