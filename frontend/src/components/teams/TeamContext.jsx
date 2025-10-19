import React, { createContext, useState, useEffect, useContext } from 'react';

// ----------------------------------------------------------------------
// 1. MOCK CONTEXTS
// ----------------------------------------------------------------------

// Mock AuthContext to satisfy component dependencies
export const AuthContext = createContext({
    // Simulate a logged-in user who is the admin of the initial teams
    user: { id: 'user123', email: 'user@example.com', name: 'Current User' },
    loading: false,
});

export const TeamContext = createContext();

// ----------------------------------------------------------------------
// 2. INITIAL DATA
// ----------------------------------------------------------------------

const initialTeams = [
  {
    id: 'team-a', // Static ID for initial data
    name: 'Frontend Fanatics',
    description: 'The best React developers in the world.',
    memberCount: 2,
    members: [
      { id: 'user123', name: 'Current User', email: 'user@example.com', role: 'Admin' },
      { id: 'member-b', name: 'Jane Doe', email: 'jane@test.com', role: 'Member' },
    ],
    prompts: [
        { 
            id: 'prompt-1', 
            text: 'Generate an abstract background.', 
            created_at: new Date(Date.now() - 60000).toISOString(), 
            parameters: JSON.stringify({ result: { raw: { url: 'https://picsum.photos/seed/prompt-1/200/300' } } }) 
        },
    ]
  },
  {
    id: 'team-b', // Static ID
    name: 'Backend Builders',
    description: 'Building robust APIs with FastAPI.',
    memberCount: 1,
    members: [
      { id: 'user123', name: 'Current User', email: 'user@example.com', role: 'Admin' },
    ],
    prompts: []
  }
];

// Mock user prompts available for adding to teams
const mockUserPrompts = [
    { id: 'up-1', text: 'A cyberpunk city skyline.', created_at: new Date(Date.now() - 120000).toISOString() },
    { id: 'up-2', text: 'A serene mountain landscape.', created_at: new Date(Date.now() - 90000).toISOString() },
    { id: 'up-3', text: 'A detailed portrait of an astronaut.', created_at: new Date(Date.now() - 30000).toISOString() },
];

// ----------------------------------------------------------------------
// 3. TEAM PROVIDER COMPONENT
// ----------------------------------------------------------------------

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState(initialTeams);
  const [userPrompts, setUserPrompts] = useState(mockUserPrompts);

  /**
   * Generates a simple timestamp ID for new entities.
   * @returns {string}
   */
  const generateId = () => `id-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;

  // --- Read Operations (Simulated Fetch) ---

  const fetchTeams = () => {
    // Simulate loading time and API response
    return new Promise(resolve => {
        setTimeout(() => resolve(teams), 500);
    });
  };

  const fetchUserPrompts = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(userPrompts), 300);
    });
  };

  const getTeamById = (id) => teams.find(t => t.id === id);

  // --- Create/Update/Delete Operations (Simulated CRUD) ---

  const createTeam = async ({ name, description }) => {
    const newTeam = {
      id: generateId(),
      name,
      description,
      memberCount: 1,
      // Auto-add the mock current user as the Admin
      members: [{ id: 'user123', name: 'Current User', email: 'user@example.com', role: 'Admin' }],
      prompts: [],
    };
    setTeams([...teams, newTeam]);
    return newTeam; 
  };

  const removeMember = async (teamId, memberId) => {
    setTeams(prevTeams => prevTeams.map(team => {
        if (team.id === teamId) {
            const updatedMembers = team.members.filter(m => m.id !== memberId);
            return { ...team, members: updatedMembers, memberCount: updatedMembers.length };
        }
        return team;
    }));
  };

  const inviteMember = async (teamId, email) => {
    // Simulate finding/creating user and adding
    const newMemberId = generateId();
    const newMember = { id: newMemberId, name: `New User (${email.split('@')[0]})`, email, role: 'Member' };

    setTeams(prevTeams => prevTeams.map(team => {
        if (team.id === teamId) {
            if (team.members.some(m => m.email === email)) {
                // Simulate backend error
                throw new Error('User is already a member or invited.');
            }
            return { ...team, members: [...team.members, newMember], memberCount: team.memberCount + 1 };
        }
        return team;
    }));
  };

  const addPromptToTeam = async (teamId, prompt_id) => {
    const promptToAdd = userPrompts.find(p => p.id === prompt_id);
    if (!promptToAdd) throw new Error('Prompt not found.');

    const newTeamPrompt = {
        ...promptToAdd,
        id: generateId(), // Give the team-specific prompt a new ID
        // Mock adding generated image parameters
        parameters: JSON.stringify({ result: { raw: { url: `https://picsum.photos/seed/${prompt_id}-${teamId}/200/300` } } }) 
    }; 

    setTeams(prevTeams => prevTeams.map(team => {
        if (team.id === teamId) {
            // Check if the prompt with the same original ID is already linked
            if (team.prompts.some(p => p.text === promptToAdd.text)) { 
                throw new Error('This prompt is already in the team.');
            }
            return { ...team, prompts: [...team.prompts, newTeamPrompt] };
        }
        return team;
    }));
  };

  const getTeamPrompts = (teamId) => {
    return new Promise(resolve => {
        const team = getTeamById(teamId);
        // Resolve with the current list of team prompts
        resolve(team ? team.prompts : []);
    });
  };


  return (
    <TeamContext.Provider value={{
      teams,
      userPrompts,
      getTeamById,
      fetchTeams,
      fetchUserPrompts,
      createTeam,
      removeMember,
      inviteMember,
      addPromptToTeam,
      getTeamPrompts,
    }}>
      {children}
    </TeamContext.Provider>
  );
};