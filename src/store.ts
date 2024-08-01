import { get, writable } from "svelte/store";
import type { LayerState } from "./@types/globals";

function createCount() {
	const { subscribe, set, update } = writable<LayerState[]>([]);

	const setVisible = (layers: LayerState[], id: string) => {
		const i = layers.findIndex((e) => e.id === id);
		layers[i].visible = true;
		return layers;
	};
	const setInvisible = (layers: LayerState[], id: string) => {
		const i = layers.findIndex((e) => e.id === id);
		layers[i].visible = false;
		return layers;
	};
	const setLoaded = (layers: LayerState[], id: string, loaded: boolean) => {
		const i = layers.findIndex((e) => e.id === id);
		layers[i].loaded = loaded;
		return layers;
	};
	const toggle = (layers: LayerState[], id: string) => {
		const i = layers.findIndex((e) => e.id === id);
		layers[i].visible = !layers[i].visible;
		return layers;
	};
	const add = (layers: LayerState[], layer: LayerState) => {
		layers.push(layer);
		return layers;
	};
	const solo = (layers: LayerState[], id: string): LayerState[] => {
		const visibleLayers = layers.filter((e) => e.visible);
		const isAlreadySolo = visibleLayers.length == 1;
		if (!isAlreadySolo || visibleLayers[0].id !== id) {
			const l = layers.map<LayerState>((e) => {
				e.visible = e.id == id;
				return e;
			});
			return l;
		}
		const l = layers.map<LayerState>((e) => {
			e.visible = true;
			return e;
		});
		return l;
	};
	const updateLayer = (layers: LayerState[], layer: LayerState) => {
		const i = layers.findIndex((e) => e.id === layer.id);
		if (i > -1) {
			layers[i] = layer;
		}
		return layers;
	};
	const setLegend = (layers: LayerState[], id: string, legend: object) => {
		const i = layers.findIndex((e) => e.id === id);
		layers[i].legend = legend;
		return layers;
	};
	return {
		subscribe,
		add: (layer: LayerState) => update((n) => add(n, layer)),
		set: (layers: LayerState[]) => set(layers),
		setVisible: (id: string) => update((n) => setVisible(n, id)),
		setInvisible: (id: string) => update((n) => setInvisible(n, id)),
		toggle: (id: string) => update((n) => toggle(n, id)),
		updateLayer: (layer: LayerState) => update((n) => updateLayer(n, layer)),
		setLoaded: (id: string, loaded: boolean) =>
			update((n) => setLoaded(n, id, loaded)),
		setLegend: (id: string, legend: object) =>
			update((n) => setLegend(n, id, legend)),
		solo: (id: string) => update((n) => solo(n, id)),
		reset: () => set([]),
	};
}

const layerStore = createCount();
const layers = () => get(layerStore);
const setupStores = () => {
	// @ts-ignore
	window.getLayerStore = layers;
	// @ts-ignore
	window.layerStore = layerStore;

	console.log("setting up layer store");
};

interface LayerStore {
	subscribe: (callback: (value: LayerState[]) => void) => void;
	add: (layer: LayerState) => void;
	set: (layers: LayerState[]) => void;
	setVisible: (id: string) => void;
	setInvisible: (id: string) => void;
	toggle: (id: string) => void;
	updateLayer: (layer: LayerState) => void;
	setLoaded: (id: string, loaded: boolean) => void;
	setLegend: (id: string, legend: object) => void;
	solo: (id: string) => void;
	reset: () => void;
}

export { layerStore, layers, setupStores, type LayerStore };
