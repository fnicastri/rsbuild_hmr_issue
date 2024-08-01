import type { LayerStore } from "../store";

interface LayerState {
	id: string;
	loaded: boolean;
}
declare global {
	interface Window {
		layersState: LayerState[];
		layerStore: LayerStore;
	}
}
