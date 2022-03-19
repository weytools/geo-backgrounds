<script>
    import Square from './Square.svelte';

    export let geo;


    // Event Handlers
    let hovering;

    function enter() {
        hovering = true;
    }

    function leave() {
        hovering = false;
    }
</script>

<svelte:component this={selected.component} on:mouseenter={enter} on:mouseleave={leave} /> 

<style>
</style>