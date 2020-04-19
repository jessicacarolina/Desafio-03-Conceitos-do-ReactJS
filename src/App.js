import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepositories() {
    const response = await api.post('repositories', {
      title: `Meu primeiro projeto ${Date.now()}`,
      url: "https://api.projetos.com.br",
      techs: "ReactJs",
      likes: 0,
    });


    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repositorie => repositorie.id !== id
    ));
  }

  return (
    <>
      <Header title="repositories" />

      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
        <li key={repositorie.id}>
          {repositorie.title}
          <button type="button" onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
        </li>)}
      </ul>

      <button type="button" onClick={handleAddRepositories}>Adicionar </button>

    </>
  );
}

export default App;
