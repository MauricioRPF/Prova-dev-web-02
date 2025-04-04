import { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';

const FormComponent = ({ show, onHide, itemToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fruta',
    price: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        category: itemToEdit.category,
        price: itemToEdit.price.toString()
      });
    } else {
      resetForm();
    }
  }, [itemToEdit]);

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Fruta',
      price: ''
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.price.trim()) {
      setError('Todos os campos marcados com * são obrigatórios');
      return false;
    }
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Preço deve ser um número válido maior que zero');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        updatedAt: new Date()
      };

      if (itemToEdit) {
        await updateDoc(doc(db, 'products', itemToEdit.id), itemData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...itemData,
          createdAt: new Date()
        });
      }

      resetForm();
      onHide();
    } catch (err) {
      setError('Erro ao salvar: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este item permanentemente?')) {
      try {
        await deleteDoc(doc(db, 'products', itemToEdit.id));
        onHide();
      } catch (err) {
        setError('Erro ao excluir: ' + err.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{itemToEdit ? 'Editar Produto' : 'Novo Produto'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto *</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoria *</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Fruta">Fruta</option>
              <option value="Padaria">Padaria</option>
              <option value="Laticínio">Laticínio</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço (R$) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>

          {itemToEdit && (
            <Button variant="danger" onClick={handleDelete} className="me-auto">
              Excluir
            </Button>
          )}

          <Button variant="primary" type="submit">
            {itemToEdit ? 'Salvar Alterações' : 'Adicionar Produto'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormComponent;