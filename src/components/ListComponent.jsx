import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const ListComponent = ({ items, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="mt-4 p-3 border rounded">
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="search"
          placeholder="Pesquisar produtos..."
          style={{ width: '300px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>
              Nome {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('category')}>
              Categoria {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('price')}>
              Preço {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>R$ {item.price.toFixed(2)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListComponent;