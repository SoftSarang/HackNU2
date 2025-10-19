// // In your main App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { TeamProvider, AuthContext } from '../TeamContext'; // Import TeamProvider

// import TeamCreate from './components/Teams/TeamCreate/TeamCreate';
// import TeamList from './components/Teams/TeamList/TeamList';
// // ... other imports

// function App() {
//   // Mock Auth Provider to avoid errors
//   const mockAuthContextValue = { user: { id: 'user123', email: 'user@example.com' }, loading: false };

//   return (
//     <AuthContext.Provider value={mockAuthContextValue}>
//       <TeamProvider> {/* Wrap the routes with the TeamProvider */}
//         <Router>
//           <Routes>
//             {/* Direct access to list/create */}
//             <Route path="/teams" element={<TeamList />} />
//             <Route path="/teams/create" element={<TeamCreate />} />
//             {/* Route for detail, using a dynamic segment */}
//             <Route path="/teams/:teamId" element={<TeamPageWrapper />} /> 
//             {/* ... other routes */}
//           </Routes>
//         </Router>
//       </TeamProvider>
//     </AuthContext.Provider>
//   );
// }

// // Helper component for /teams/:teamId route
// const TeamPageWrapper = () => {
//   const { teamId } = useParams();
//   const { getTeamById } = useContext(TeamContext);
//   const team = getTeamById(teamId);

//   if (!team) return <Alert severity="error">Team not found.</Alert>;
//   return <TeamDetail team={team} />;
// };