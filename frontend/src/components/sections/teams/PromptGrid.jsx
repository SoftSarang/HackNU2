import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getTeamPrompts } from '../../../api/higgsfield';

const Grid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;`;
const Card = styled.div`background:#111;padding:12px;border-radius:10px;color:#fff;`;

export default function PromptGrid({teamId}){
	const [prompts,setPrompts]=useState([]);
	useEffect(()=>{ if(teamId) load(); else setPrompts([]) },[teamId]);
	async function load(){
		try{ const res = await getTeamPrompts(teamId); setPrompts(res || []); }
		catch(e){ console.error(e); setPrompts([]); }
	}

	if(!teamId) return <div>Select a team to view prompts</div>;

	return (
		<div>
			<h3>Team prompts</h3>
			<Grid>
				{prompts.length===0 && <div>No prompts yet</div>}
				{prompts.map(p=> (
					<Card key={p.id}>
						<div style={{fontSize:14,opacity:0.9}}>{p.text}</div>
						<div style={{marginTop:8,fontSize:12,color:'#999'}}>By {p.user_id||p.owner||'unknown'}</div>
					</Card>
				))}
			</Grid>
		</div>
	)
}
