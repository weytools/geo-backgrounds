<script lang="ts">
    import Square from './Square.svelte';
    import { onMount, onDestroy } from 'svelte';
    import type { BgElement } from "src/types/bgelement.type";
	import { getColorClass } from "./geos";

    export let element: BgElement;
    export let delay: number;
    let colorClass = getColorClass()

    $: visible = false;

    onMount(()=>{
        setInterval( () => {visible=true}, delay*100)
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



<!-- <rect class="btn" x={element.xPos} y={element.yPos} on:click={invertVis} /> -->
<!-- {#if visible} -->
    <svelte:component this={element.component} x={element.xPos} y={element.yPos} {colorClass}
    on:mouseenter={enter} on:mouseleave={leave} {visible} /> 
<!-- {/if} -->



<style>
rect.btn{
    fill: blanchedalmond !important;
    border: 3px solid darkkhaki;
}
</style>