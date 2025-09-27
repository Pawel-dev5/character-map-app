import type { MapTheme } from '../types/map';

export const MAP_THEMES: MapTheme[] = [
	{
		id: 'osm-standard',
		name: 'maps.osm-standard.name',
		type: 'topographic',
		description: 'maps.osm-standard.description',
		backgroundImage: 'https://tile.openstreetmap.org/10/512/341.png',
		gridColor: 'rgba(0,0,0,0.1)',
		borderColor: '#6b7280',
	},
	{
		id: 'carto-light',
		name: 'maps.carto-light.name',
		type: 'topographic',
		description: 'maps.carto-light.description',
		backgroundImage: 'https://a.basemaps.cartocdn.com/light_all/10/512/341.png',
		gridColor: 'rgba(0,0,0,0.08)',
		borderColor: '#d1d5db',
	},
	{
		id: 'carto-dark',
		name: 'maps.carto-dark.name',
		type: 'topographic',
		description: 'maps.carto-dark.description',
		backgroundImage: 'https://a.basemaps.cartocdn.com/dark_all/10/512/341.png',
		gridColor: 'rgba(255,255,255,0.1)',
		borderColor: '#4b5563',
	},
	{
		id: 'retro-overworld',
		name: 'maps.retro-overworld.name',
		type: 'pixel',
		description: 'maps.retro-overworld.description',
		backgroundImage: 'https://img.itch.zone/aW1nLzIzMTY2Nzc1LmdpZg==/original/jI9Cj3.gif',
		gridColor: 'rgba(0,0,0,0.1)',
		borderColor: '#22c55e',
	},
	{
		id: 'pixel-forest',
		name: 'maps.pixel-forest.name',
		type: 'pixel',
		description: 'maps.pixel-forest.description',
		backgroundImage:
			'https://kottke.org/cdn-cgi/image/format=auto,fit=scale-down,width=1200,metadata=none/plus/misc/images/animated-%20pixel-map-usa.jpg',
		gridColor: 'rgba(0,0,0,0.1)',
		borderColor: '#15803d',
	},
	{
		id: 'pixel-desert',
		name: 'maps.pixel-desert.name',
		type: 'pixel',
		description: 'maps.pixel-desert.description',
		backgroundImage: 'https://imgcdn.stablediffusionweb.com/2024/5/10/118ae63e-7e7e-48f4-a6de-96613248b030.jpg',
		gridColor: 'rgba(0,0,0,0.05)',
		borderColor: '#f59e0b',
	},
	{
		id: 'pixel-ocean',
		name: 'maps.pixel-ocean.name',
		type: 'pixel',
		description: 'maps.pixel-ocean.description',
		backgroundImage:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2bb4e63a-09f1-4ad9-b681-268bf927206f/d9kjmt3-c75f14f0-e09c-4f0f-a71a-abfcdc8bb9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8yYmI0ZTYzYS0wOWYxLTRhZDktYjY4MS0yNjhiZjkyNzIwNmYvZDlram10My1jNzVmMTRmMC1lMDljLTRmMGYtYTcxYS1hYmZjZGM4YmI5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pP17tU8RCIaxox12tAzoZ7QB3jlC8HQcSc2Nf-f6Mok',
		gridColor: 'rgba(255,255,255,0.1)',
		borderColor: '#2563eb',
	},
	{
		id: 'retro-dungeon',
		name: 'maps.retro-dungeon.name',
		type: 'pixel',
		description: 'maps.retro-dungeon.description',
		backgroundImage:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/47246b88-5007-4268-bcf5-0e7fbe9b369e/d80y9og-20fe8e03-3db5-466c-bfd6-c84a4a0b1d9f.png/v1/fill/w_1082,h_739,q_70,strp/rpg___pixel_map_by_disnie_d80y9og-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi80NzI0NmI4OC01MDA3LTQyNjgtYmNmNS0wZTdmYmU5YjM2OWUvZDgweTlvZy0yMGZlOGUwMy0zZGI1LTQ2NmMtYmZkNi1jODRhNGEwYjFkOWYucG5nIiwiaGVpZ2h0IjoiPD04NzQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vNDcyNDZiODgtNTAwNy00MjY4LWJjZjUtMGU3ZmJlOWIzNjllL2Rpc25pZS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.mFWPsr0D3ALVJNCqwwqTgcyw3rJUuFSy926bVbhZw4I',
		gridColor: 'rgba(255,255,255,0.1)',
		borderColor: '#6b7280',
	},
];

export const getThemeById = (id: string): MapTheme => {
	return MAP_THEMES.find((theme) => theme.id === id) || MAP_THEMES[0];
};

export const getThemesByType = (type: MapTheme['type']): MapTheme[] => {
	return MAP_THEMES.filter((theme) => theme.type === type);
};
