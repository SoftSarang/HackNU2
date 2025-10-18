import React from 'react';
import TeamForm from './TeamForm'; // Форма создания команды

const CreateTeamPage = () => {
  return (
    <div className="create-team-page">
      <h2>Создание новой команды</h2>
      <TeamForm /> {/* Форма создания команды */}
    </div>
  );
};

export default CreateTeamPage;
