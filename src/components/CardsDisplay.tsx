/**
 * A component that displays a list of cards from the DataStore.
 * This component fetches the list of cards from the DataStore when mounted.
 * It also provides a loading indicator and an error message.
 */
import { useState, useEffect } from 'react';
import { DataStore, Cards } from "@aws-amplify/datastore";

// A component that displays a list of cards from the DataStore
const CardsDisplay = () => {
  // The list of cards, initially empty
  const [cards, setCards] = useState([]);
  // Whether the component is currently fetching the list of cards
  const [loading, setLoading] = useState(true);
  // Whether there was an error fetching the list of cards
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of cards when the component is mounted
    fetchCards();
  }, []);

  /**
   * Fetch the list of cards from the DataStore
   */
  const fetchCards = async () => {
    try {
      // Fetch the list of cards from the DataStore
      const cards = await DataStore.query(cards);
      // Set the list of cards in the state
      setCards(cards);
      // Set the loading state to false
      setLoading(false);
    } catch (err) {
      // Set the error state if there was an error fetching the list of cards
      setError('Failed to fetch cards');
      // Set the loading state to false
      setLoading(false);
    }
  };

  // If the component is currently fetching the list of cards, display a loading indicator
  if (loading) return <div className="p-4">Loading cards...</div>;
  // If there was an error fetching the list of cards, display an error message
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // Display the list of cards
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Card Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{card.name}</h2>
            <p className="text-gray-600">{card.description}</p>
            <div className="mt-2">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {card.element || 'No Element'}
              </span>
              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm ml-2">
                {card.rarity}
              </span>
            </div>
            <div className="mt-2">
              <p>Power Rating: {card.power_rating}</p>
              <p>Set: {card.set_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsDisplay;