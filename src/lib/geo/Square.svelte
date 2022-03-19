<script>
    import { onMount } from "svelte";

    export let x;
    export let y;


    let rotation = 0
    let maxRotation = 89
    function rotate(){
        rotation = Math.floor(Math.random() * 89)
    }

    $: styles = `
    transform: rotate(${rotation}deg);   
    `
</script>
<rect on:click={rotate} on:mouseover on:mouseout class="geo-c1" {x} {y} style={styles} />

<style>
</style>