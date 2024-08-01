import App from "./App.svelte";
import "./index.css";
import { setupStores, type LayerStore } from "./store";

setupStores();
window.layerStore.add({
	id: self.crypto.randomUUID(),

	loaded: true,
});

const app = new App({
	target: document.body,
});
console.log("index.ts");

export default app;
