<script>
    import { onMount } from "svelte";

    export let x;
    export let y;


    let rotation = 0
    let maxRotation = 89

    onMount(()=>rotate());

    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    }

    $: styles = `
    transform: rotate(${rotation}deg);   
    `
</script>
<rect on:click={rotate} class="geo-c1" {x} {y} style={styles} />

<style>
</style>