<script>
    import { onMount } from "svelte";

    export let x;
    export let y;
    export let colorClass;


    let rotation = 0
    let maxRotation = 89

    onMount(()=>rotate());

    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    }

    $: styles = `
    transform: rotate(${rotation}deg);   
    `
    // on:click={rotate} 
</script>
<rect class="{colorClass}" {x} {y} style={styles} />

<style>
</style>