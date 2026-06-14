function Card({ name, house, image, wiki }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Character Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Character Info */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 italic">{house || "Unknown House"}</p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Action Button */}
        {(wiki) ? (<button onClick = {() => window.location.href = wiki} className="w-full bg-linear-to-r from-pink-400 to-red-400 text-white py-2 rounded-lg shadow-md hover:from-pink-500 hover:to-red-500 transition">
          View Details
        </button>) : (<p></p>)}
        
      </div>
    </div>
  );
}

export default Card;
