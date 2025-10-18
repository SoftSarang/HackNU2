// src/api/teams.js

// Получаем текущую команду пользователя
export const getUserTeam = async () => {
  const response = await fetch('/api/teams');
  const data = await response.json();
  return data;
};

// Создаем новую команду
export const createTeam = async (name, description) => {
  const response = await fetch('/api/teams', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

// Ищем существующие команды
export const searchTeams = async (query) => {
  const response = await fetch(`/api/teams?search=${query}`);
  return response.json();
};

// Присоединяемся к команде
export const joinTeam = async (teamId) => {
  const response = await fetch(`/api/teams/join`, {
    method: 'POST',
    body: JSON.stringify({ teamId }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

// Получаем список промптов для команды
export const getPrompts = async (teamId) => {
  const response = await fetch(`/api/prompts?teamId=${teamId}`);
  return response.json();
};
