import React from 'react';

function Favorites({ favorites, onRemove, onView }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div>
      <h2><span style={{ color: '#a5511dff' }}>⭐</span> Favorites</h2>
      <div className="recipe-list">
        {favorites.map((fav) => (
          <div key={fav.id} className="recipe-card">
            <img src={fav.image} alt={fav.title} />
            <h3>{fav.title}</h3>
            <button onClick={() => onView(fav.id)}>View</button>
            <button onClick={() => onRemove(fav.id)}>🗑 Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
