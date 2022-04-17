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
    transform: rotate(${rotation}deg)   
    `
    let backer = 'translate(15%, 15%)'
    // on:click={rotate} 
</script>
<rect class="backer" x={x+10} y={y+10} style={styles+backer}/>
<rect class="main {colorClass}" {x} {y} style={styles} />

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