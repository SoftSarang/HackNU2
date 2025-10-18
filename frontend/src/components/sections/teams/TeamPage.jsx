import React, { useState, useEffect } from 'react';
import TeamForm from './TeamForm';
import TeamSearch from './TeamSearch';
import PromptGrid from './PromptGrid';
import { getUserTeam } from '../../../api/teams';
import './TeamPage.css'; // Импортируем стили

const TeamPage = () => {
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getUserTeam(); // Получаем данные о команде пользователя
        setUserTeam(data.team);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="team-page-container">
      {userTeam ? (
        <PromptGrid teamId={userTeam.id} />
      ) : (
        <div className="team-buttons-container">
          <button onClick={() => setShowCreateTeam(true)}>Создать команду</button>
          <button onClick={() => setShowJoinTeam(true)}>Присоединиться к команде</button>

          {showCreateTeam && <TeamForm />}
          {showJoinTeam && <TeamSearch />}
        </div>
      )}
    </div>
  );
};

export default TeamPage;
