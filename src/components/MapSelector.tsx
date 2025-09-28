import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { MapTheme, GeoCoordinates } from '../types/map';
import { getThemesByType } from '../data/mapThemes';
import { geocodeAddress, getAddressSuggestions, type AddressSuggestion } from '../utils/geocoding';
import { useDebounce } from '../hooks/useDebounce';
import './MapSelector.css';

interface MapSelectorProps {
	currentTheme: MapTheme;
	availableThemes: MapTheme[];
	onThemeChange: (themeId: string) => void;
	onCoordinatesChange?: (coordinates: GeoCoordinates | null) => void;
}

export const MapSelector = ({ currentTheme, onThemeChange, onCoordinatesChange }: MapSelectorProps) => {
	const { t } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState<MapTheme['type']>('pixel');
	const [addressInput, setAddressInput] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [searchResult, setSearchResult] = useState<{
		status: 'none' | 'found' | 'not_found' | 'error';
		message?: string;
		coordinates?: GeoCoordinates;
	}>({ status: 'none' });
	const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
	const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionRefs = useRef<HTMLDivElement[]>([]);

	const debouncedAddressInput = useDebounce(addressInput, 300);

	const filteredThemes = getThemesByType(selectedCategory);

	// Effect do pobierania sugestii z debounce
	useEffect(() => {
		const fetchSuggestions = async () => {
			if (debouncedAddressInput.trim().length < 3) {
				setSuggestions([]);
				setShowSuggestions(false);
				return;
			}

			setIsFetchingSuggestions(true);
			const result = await getAddressSuggestions(debouncedAddressInput);

			if (result.success && result.data) {
				setSuggestions(result.data);
				setShowSuggestions(result.data.length > 0);
				setSelectedSuggestionIndex(-1);
			} else {
				console.error('Error fetching suggestions:', result.error?.message);
				setSuggestions([]);
				setShowSuggestions(false);
			}
			setIsFetchingSuggestions(false);
		};

		if (selectedCategory === 'topographic') {
			fetchSuggestions();
		}
	}, [debouncedAddressInput, selectedCategory]);

	const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
		setAddressInput(suggestion?.displayName);
		setShowSuggestions(false);
		setSelectedSuggestionIndex(-1);

		const coordinates: GeoCoordinates = {
			latitude: suggestion?.coordinates?.lat,
			longitude: suggestion?.coordinates?.lon,
			address: suggestion?.displayName || '',
		};

		setSearchResult({
			status: 'found',
			message: suggestion?.displayName,
			coordinates,
		});
		onCoordinatesChange?.(coordinates);
	};

	const handleAddressSearch = async () => {
		if (!addressInput?.trim()) return;

		setIsSearching(true);
		setSearchResult({ status: 'none' });

		const result = await geocodeAddress(addressInput);

		if (result?.success && result?.data) {
			setSearchResult({
				status: 'found',
				message: result?.data?.address,
				coordinates: result?.data,
			});
			onCoordinatesChange?.(result?.data);
		} else if (result?.errorType === 'INVALID_ADDRESS') {
			setSearchResult({
				status: 'not_found',
				message: result?.error?.message,
			});
			onCoordinatesChange?.(null);
		} else {
			setSearchResult({
				status: 'error',
				message: result?.error?.message,
			});
			onCoordinatesChange?.(null);
		}
		setIsSearching(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (!showSuggestions) {
			if (e?.key === 'Enter') {
				handleAddressSearch();
			}
			return;
		}

		switch (e?.key) {
			case 'ArrowDown':
				e?.preventDefault();
				setSelectedSuggestionIndex((prev) => (prev < suggestions?.length - 1 ? prev + 1 : prev));
				break;
			case 'ArrowUp':
				e?.preventDefault();
				setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
				break;
			case 'Enter':
				e?.preventDefault();
				if (selectedSuggestionIndex >= 0) {
					handleSuggestionSelect(suggestions?.[selectedSuggestionIndex]);
				} else {
					handleAddressSearch();
				}
				break;
			case 'Escape':
				e?.preventDefault();
				setShowSuggestions(false);
				setSelectedSuggestionIndex(-1);
				break;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressInput(e?.target?.value);
		setSearchResult({ status: 'none' });
	};

	const handleInputBlur = () => {
		// Delay hiding suggestions to allow for clicks
		setTimeout(() => {
			setShowSuggestions(false);
			setSelectedSuggestionIndex(-1);
		}, 200);
	};

	const handleInputFocus = () => {
		if (suggestions?.length > 0) {
			setShowSuggestions(true);
		}
	};

	return (
		<div className="map-selector" data-testid="map-selector">
			{/* Category Tabs */}
			<div className="map-category-tabs">
				<button
					className={`category-tab ${selectedCategory === 'pixel' ? 'active' : ''}`}
					onClick={() => setSelectedCategory('pixel')}
					aria-pressed={selectedCategory === 'pixel'}
					aria-label={t('mapSelector.categories.gaming')}
					role="button"
					type="button"
				>
					{t('mapSelector.categories.gaming')}
				</button>
				<button
					className={`category-tab ${selectedCategory === 'topographic' ? 'active' : ''}`}
					onClick={() => setSelectedCategory('topographic')}
					aria-pressed={selectedCategory === 'topographic'}
					aria-label={t('mapSelector.categories.topographic')}
					role="button"
					type="button"
				>
					{t('mapSelector.categories.topographic')}
				</button>
			</div>

			{/* Address Search - only for topographic maps */}
			{selectedCategory === 'topographic' && (
				<div className="address-search-section">
					<label className="address-label" htmlFor="address-search-input">
						{t('mapSelector.address.label')}
					</label>
					<div className="address-input-group">
						<div className="address-input-container">
							<input
								id="address-search-input"
								ref={inputRef}
								type="text"
								value={addressInput}
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
								placeholder={t('mapSelector.address.placeholder')}
								className="address-input"
								disabled={isSearching}
								autoComplete="off"
								aria-label={t('mapSelector.address.placeholder')}
								role="textbox"
							/>
							{isFetchingSuggestions && <div className="suggestions-loading">🔍</div>}
							{showSuggestions && suggestions?.length > 0 && (
								<div className="suggestions-dropdown">
									{suggestions?.map((suggestion, index) => (
										<div
											key={suggestion?.id}
											ref={(el) => {
												if (el) suggestionRefs.current[index] = el;
											}}
											className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
											onClick={() => handleSuggestionSelect(suggestion)}
										>
											<div className="suggestion-name">{suggestion?.displayName?.split(',')?.[0]}</div>
											<div className="suggestion-details">
												{suggestion?.displayName?.split(',')?.slice(1)?.join(',')?.trim()}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						<button
							onClick={handleAddressSearch}
							disabled={isSearching || !addressInput?.trim()}
							className="address-search-button"
							aria-label={t('mapSelector.address.search')}
							role="button"
							type="button"
						>
							{isSearching ? t('mapSelector.address.searching') : t('mapSelector.address.search')}
						</button>
					</div>
					{searchResult?.status !== 'none' && (
						<div className={`search-result ${searchResult?.status}`}>
							{searchResult?.status === 'found' && (
								<span>
									{t('mapSelector.address.found', {
										address: searchResult?.message,
									})}
								</span>
							)}
							{searchResult?.status === 'not_found' && <span>{t('mapSelector.address.notFound')}</span>}
							{searchResult?.status === 'error' && <span>{t('mapSelector.address.error')}</span>}
						</div>
					)}
				</div>
			)}

			{/* Theme Grid */}
			<div className="theme-grid">
				{filteredThemes?.map((theme) => (
					<button
						key={theme?.id}
						data-testid={`map-theme-${theme?.id}`}
						className={`theme-card ${currentTheme?.id === theme?.id ? 'active' : ''}`}
						onClick={() => onThemeChange(theme?.id)}
						aria-pressed={currentTheme?.id === theme?.id}
						aria-label={`${t('mapSelector.selectTheme')}: ${t(theme?.name)}`}
						role="button"
						type="button"
					>
						<div
							className="theme-preview"
							style={{
								backgroundColor: '#e5e7eb',
								borderColor: theme?.borderColor || '#d1d5db',
								backgroundImage: theme?.backgroundImage ? `url("${theme?.backgroundImage}")` : undefined,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							{!theme?.backgroundImage &&
								(theme?.type === 'topographic' ? (
									<div className="topographic-indicator">🗺️</div>
								) : (
									<div className="pixel-indicator">▓</div>
								))}
						</div>
						<div className="theme-info">
							<div className="theme-name">{t(theme?.name)}</div>
							<div className="theme-description">{t(theme?.description)}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
