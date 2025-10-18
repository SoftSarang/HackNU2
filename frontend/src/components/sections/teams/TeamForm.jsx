import React, {useState} from 'react';
import styled from 'styled-components';
import { createTeam } from '../../../api/higgsfield';

const Form = styled.form`display:flex;gap:8px;align-items:center;`;

export default function TeamForm({onCreated}){
	const [name,setName]=useState('');
	const [loading,setLoading]=useState(false);

	async function submit(e){
		e.preventDefault();
		if(!name) return;
		setLoading(true);
		try{ await createTeam({name}); setName(''); onCreated?.(); }
		catch(e){console.error(e); alert('Failed to create team')}
		finally{setLoading(false)}
	}

	return (
		<Form onSubmit={submit} aria-label="Create team">
			<input placeholder="Team name" value={name} onChange={e=>setName(e.target.value)} />
			<button type="submit" disabled={loading}>{loading? 'Creating...':'Create Team'}</button>
		</Form>
	)
}
