<script>
    import { onMount } from "svelte";

    export let x;
    export let y;
    export let colorClass;

    // $: styles = `
    // transform: rotate(${rotation}deg);   
    // `
    // style={styles} 
</script>

<circle class="{colorClass}" cx="{x}" cy="{y}" />

<style>
</style>