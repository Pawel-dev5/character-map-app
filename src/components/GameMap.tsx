import { useEffect, useRef, type CSSProperties } from "react";
import L from "leaflet";
import { Character } from "./Character";
import type { Character as CharacterType } from "../types";
import type { GeoCoordinates, MapConfig } from "../types/map";
import "./GameMap.css";
import "leaflet/dist/leaflet.css";

interface GameMapProps {
  character: CharacterType;
  mapConfig: MapConfig;
  coordinates?: GeoCoordinates | null;
  onLocationChange?: () => void;
}

export const GameMap = ({
  character,
  mapConfig,
  coordinates,
  onLocationChange,
}: GameMapProps) => {
  const { width, height, tileSize, theme } = mapConfig;
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (theme?.type !== "topographic" || !mapRef.current) return;

    // Clean up existing map
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // Default coordinates (center of Poland)
    const defaultLat = 52.0693;
    const defaultLng = 19.4803;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
    }).setView(
      coordinates
        ? [coordinates?.latitude, coordinates?.longitude]
        : [defaultLat, defaultLng],
      coordinates ? 15 : 6
    );

    const getTileLayerUrl = () => {
      switch (theme?.id) {
        case "osm-standard":
          return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        case "carto-light":
          return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
        case "carto-dark":
          return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
        default:
          return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      }
    };

    const getAttribution = () => {
      switch (theme?.id) {
        case "osm-standard":
          return '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
        case "carto-light":
        case "carto-dark":
          return '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>';
        default:
          return '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
      }
    };

    L.tileLayer(getTileLayerUrl(), {
      attribution: getAttribution(),
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;

    // Cleanup on unmount
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [theme, coordinates]);

  // Update map center when coordinates change
  useEffect(() => {
    if (theme?.type !== "topographic" || !leafletMapRef.current || !coordinates)
      return;

    leafletMapRef.current.setView(
      [coordinates?.latitude, coordinates?.longitude],
      15,
      { animate: true }
    );

    // Reset character position to map center
    onLocationChange?.();
  }, [coordinates, theme, onLocationChange]);

  // Auto-pan map when character approaches edge
  useEffect(() => {
    if (theme?.type !== "topographic" || !leafletMapRef.current) return;

    const { x, y } = character.position;
    const edgeThreshold = 0; // Only at the very edge!

    let shouldPan = false;
    const panDistance = 0.015; // How far to move the map (in degrees)
    let newCenter = leafletMapRef.current.getCenter();

    // Check if character is near left/right edge
    if (x <= edgeThreshold) {
      // Character at left edge - pan map west
      newCenter = L.latLng(newCenter.lat, newCenter.lng - panDistance);
      shouldPan = true;
    } else if (x >= width - edgeThreshold - 1) {
      // Character at right edge - pan map east
      newCenter = L.latLng(newCenter.lat, newCenter.lng + panDistance);
      shouldPan = true;
    }

    // Check if character is near top/bottom edge
    if (y <= edgeThreshold) {
      // Character at top edge - pan map north
      newCenter = L.latLng(newCenter.lat + panDistance, newCenter.lng);
      shouldPan = true;
    } else if (y >= height - edgeThreshold - 1) {
      // Character at bottom edge - pan map south
      newCenter = L.latLng(newCenter.lat - panDistance, newCenter.lng);
      shouldPan = true;
    }

    if (shouldPan) {
      leafletMapRef.current.panTo(newCenter, {
        animate: true,
        duration: 0.02, // Lightning fast animation!
        easeLinearity: 0.05, // Even more linear
      });
    }
  }, [character.position, theme, width, height]);

  // Generate tile URL for pixel maps (fallback for coordinate-based backgrounds)
  const getTileUrl = (lat: number, lon: number, zoom: number = 10) => {
    const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
    const y = Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, zoom)
    );

    if (theme?.id === "osm-standard") {
      return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
    } else if (theme?.id === "carto-light") {
      return `https://a.basemaps.cartocdn.com/light_all/${zoom}/${x}/${y}.png`;
    } else if (theme?.id === "carto-dark") {
      return `https://a.basemaps.cartocdn.com/dark_all/${zoom}/${x}/${y}.png`;
    }

    return theme?.backgroundImage;
  };

  const cssVars = {
    "--map-width": width,
    "--map-height": height,
    "--tile-size": `${tileSize}px`,
    "--map-bg-color": theme?.backgroundColor || "#f0f8ff",
  } as CSSProperties;

  // Determine background image URL based on coordinates (for topographic maps) or default
  const backgroundImageUrl =
    theme?.type === "topographic" && coordinates
      ? getTileUrl(coordinates?.latitude, coordinates?.longitude)
      : theme?.backgroundImage;

  const mapStyle: CSSProperties = {
    ...cssVars,
    backgroundImage: backgroundImageUrl
      ? `url("${backgroundImageUrl}")`
      : undefined,
    backgroundSize: "cover",
    backgroundColor: theme?.backgroundColor || "#f0f8ff",
    border: "none",
  };

  if (theme?.type === "topographic") {
    return (
      <div className="game-map-container">
        <div
          ref={mapRef}
          className="leaflet-map-container"
          style={{
            width: width * tileSize,
            height: height * tileSize,
          }}
        />
        <div className="character-overlay">
          <Character
            character={character}
            mapConfig={{ width, height, tileSize }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="game-map-container">
      <div className="game-map" style={mapStyle}>
        <Character
          character={character}
          mapConfig={{ width, height, tileSize }}
        />
      </div>
    </div>
  );
};
