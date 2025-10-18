import { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);

  const fetchTeams = async () => {
    // Implement fetch teams logic
  };

  const createTeam = async (teamData) => {
    // Implement create team logic
  };

  const joinTeam = async (teamId) => {
    // Implement join team logic
  };

  const leaveTeam = async (teamId) => {
    // Implement leave team logic
  };

  const value = {
    teams,
    currentTeam,
    fetchTeams,
    createTeam,
    joinTeam,
    leaveTeam,
    setCurrentTeam,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}

export default TeamContext;