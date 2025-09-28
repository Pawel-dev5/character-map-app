export interface TranslationResource {
	app: {
		title: string;
		subtitle: string;
	};
	characterForm: {
		title: string;
		nameLabel: string;
		namePlaceholder: string;
		colorLabel: string;
		colorLoading: string;
		colorError: string;
		colorSuccess: string;
		colorPlaceholder: string;
		avatarLabel: string;
		avatarRogue: string;
		avatarWarrior: string;
		avatarMage: string;
		avatarArcher: string;
		instructions: {
			title: string;
			enterName: string;
			selectColor: string;
			selectMap: string;
			mapTypes: {
				topographic: string;
				pixel: string;
			};
			useArrows: string;
		};
	};
	mapSelector: {
		title: string;
		categories: {
			gaming: string;
			topographic: string;
		};
		selectTheme: string;
		showGrid: string;
		currentMap: string;
		currentDescription: string;
		address: {
			label: string;
			placeholder: string;
			search: string;
			searching: string;
			notFound: string;
			found: string;
			error: string;
		};
	};
	gameMap: {
		position: string;
		badges: {
			pixel: string;
			topographic: string;
		};
	};
	maps: Record<
		string,
		{
			name: string;
			description: string;
		}
	>;
	language: {
		switch: string;
		english: string;
		polish: string;
		switchTo: string;
	};
	common: {
		loading: string;
	};
	errors: Record<string, string>;
}
