import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import CardsDisplay from './components/CardsDisplay';

const client = generateClient<Schema>();


function App() {
  return (
    <div>
      <CardsDisplay />
    </div>
  );
}

export default App;
