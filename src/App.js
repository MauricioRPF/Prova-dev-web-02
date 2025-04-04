import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { db, collection, onSnapshot } from './firebase';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';
import ChartComponent from './components/ChartComponent';

function App() {
  const [items, setItems] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Buscar dados do Firebase em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const firebaseItems = [];
      snapshot.forEach((doc) => {
        firebaseItems.push({ id: doc.id, ...doc.data() });
      });
      setItems(firebaseItems);
      updateChartData(firebaseItems);
    });

    return () => unsubscribe();
  }, []);

  const updateChartData = (items) => {
    const categoryCount = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const newChartData = Object.keys(categoryCount).map(category => ({
      category,
      value: categoryCount[category] * 10
    }));

    setChartData(newChartData);
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciamento de Produtos</h1>
        <Button variant="success" onClick={handleAddItem}>
          + Novo Produto
        </Button>
      </div>

      <FormComponent 
        show={showForm}
        onHide={() => setShowForm(false)}
        itemToEdit={selectedItem}
      />

      <ChartComponent data={chartData} />
      
      <ListComponent items={items} onEdit={handleEditItem} />
    </Container>
  );
}

export default App;