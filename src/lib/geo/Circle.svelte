<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let x;
    export let y;
    export let colorClass;
    export let visible;

    let rotation = 0
    let maxRotation = 89

    $: styles = `
    transform: rotate(${rotation}deg);   
    `
    onMount(()=>rotate());

    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    }
    let backer = 'transform: translate(15%, 15%)'
    
</script>


{#if visible}
<circle transition:fade class="backer" cx="{x}" cy="{y}" style={styles+backer}/>
<circle transition:fade class="{colorClass}" cx="{x}" cy="{y}" />
{/if}


<style>
</style>