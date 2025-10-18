const BASE = '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  // try to parse json, otherwise return text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export async function listTeams(){ return request('/teams'); }
export async function createTeam(payload){ return request('/teams', { method: 'POST', body: JSON.stringify(payload) }); }
export async function getTeamPrompts(teamId){ return request(`/teams/${teamId}/prompts`); }

export default { listTeams, createTeam, getTeamPrompts };
