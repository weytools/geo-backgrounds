<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let x;
    export let y;
    export let colorClass;
    export let visible;


    let rotation = 0
    let maxRotation = 89

    onMount(()=>rotate());

    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    }

    $: styles = `
    transform: rotate(${rotation}deg)   
    `
    let backer = 'translate(15%, 15%)'
    // on:click={rotate} 
</script>

{#if visible}
<rect transition:fade class="backer" x={x+10} y={y+10} style={styles+backer}/>
<rect transition:fade class="main {colorClass}" {x} {y} style={styles} />
{/if}

<style lang="scss">
    $rotate: floor(random(90));

    rect {
        animation: life 5s infinite ease-in-out;
    }
    @keyframes  life {
        0%{
            transform: rotate(#{$rotate}deg); 
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
       100% {
            transform: rotate(#{$rotate+360}deg); 
            opacity: 0;
        }
    }
</style>