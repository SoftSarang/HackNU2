import React, { useState } from 'react';

export default function TeamSearch({ onSearch }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    onSearch?.(q); // Отправляем запрос на поиск команды
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        placeholder="Search teams"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
        Search
      </button>
    </form>
  );
}
