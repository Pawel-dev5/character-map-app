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
		backgroundImage: 'https://img.itch.zone/aW1nLzc2NDY4MDEuZ2lm/original/9zxkqt.gif',
		gridColor: 'rgba(255,255,255,0.1)',
		borderColor: '#2563eb',
	},
	{
		id: 'retro-dungeon',
		name: 'maps.retro-dungeon.name',
		type: 'pixel',
		description: 'maps.retro-dungeon.description',
		backgroundImage: 'https://img.itch.zone/aW1hZ2UvMjU3MTkzMy8yMzMzMzY4Ny5naWY=/original/0hoUuK.gif',
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
