<script lang="ts">
    import Square from './Square.svelte';
    import { onMount, onDestroy } from 'svelte';
    import type { BgElement } from "src/types/bgelement.type";
	import { getColorClass } from "./geos";

    export let element: BgElement;
    let colorClass = getColorClass()


    onMount(()=>{

    })

    onDestroy(()=>{
        // tell svgbg to make a new one in my place
    })

    // Event Handlers
    let hovering;

    function enter() {
        hovering = true;
    }

    function leave() {
        hovering = false;
    }
</script>
<svelte:component this={element.component} x={element.xPos} y={element.yPos} {colorClass}
    on:mouseenter={enter} on:mouseleave={leave} /> 

<style>

</style>