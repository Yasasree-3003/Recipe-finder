import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Favorites from './components/Favorites';
import RecipeModal from './components/RecipeModal';

const API_KEY = 'API_KEY';
function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);
  const fetchRecipes = async () => {
  if (!query.trim()) {
    setRecipes([]);
    setErrorMessage('Please enter a recipe name');
    return;
  }
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      setRecipes(data.results);
      setErrorMessage('');
    } else {
      setRecipes([]);
      setErrorMessage(`No recipes found for "${query}"`);
    }
  } catch (error) {
    setRecipes([]);
    setErrorMessage('Something went wrong. Please try again.');
  }
};
  const fetchRecipeDetails = async (id) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const data = await res.json();
    setSelectedRecipe(data);
  };

  const addToFavorites = (recipe) => {
    const updated = [...favorites, recipe];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };
  const removeFromFavorites = (id) => {
    const updated = favorites.filter((r) => r.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };
  return (
    <div className="app">
      <h2 className="main-title">Recipe Finder</h2>
      <SearchBar query={query} setQuery={setQuery} onSearch={fetchRecipes} />
      {errorMessage && (
  <div className="error-message">
    {errorMessage}
  </div>
)}
      {recipes.length > 0 && (
        <>
          <RecipeList
            recipes={recipes}
            onView={fetchRecipeDetails}
            onSave={addToFavorites}
          />
          <Favorites
  favorites={favorites}
  onRemove={removeFromFavorites}
  onView={fetchRecipeDetails}
  starColor="#b969ffd0" 
/>   
        </>
      )}

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}
export default App;
