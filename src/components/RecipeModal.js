import React from 'react';

function RecipeModal({ recipe, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <h4>Ingredients:</h4>
        <ul>
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <p>{recipe.instructions || 'Instructions not available.'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RecipeModal;
