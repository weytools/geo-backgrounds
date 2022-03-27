<script>
    import { onMount } from "svelte";

    export let x;
    export let y;
    export let colorClass;

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

<circle class="backer" cx="{x}" cy="{y}" style={styles+backer}/>
<circle class="{colorClass}" cx="{x}" cy="{y}" />

<style>
</style>