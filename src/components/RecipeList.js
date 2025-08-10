import React from 'react';

function RecipeList({ recipes, onView, onSave }) {
  return (
    <div>
      <h2>Search Results</h2>
      <div className="recipe-list">
        {recipes.map((r) => (
          <div key={r.id} className="recipe-card">
            <img src={r.image} alt={r.title} />
            <h3>{r.title}</h3>
            <button onClick={() => onSave(r)}> Save</button>
            <button onClick={() => onView(r.id)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
