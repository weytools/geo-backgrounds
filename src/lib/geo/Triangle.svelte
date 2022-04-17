<script>
    import { onMount } from "svelte";
	import { shapeSize } from "./geos";
    import { fade } from "svelte/transition";


    export let x;
    export let y;
    export let colorClass;
    export let visible;


    let rotation = 0
    let maxRotation = 120
    let points = ''

    function buildPointsList(){
        // "0,50 5,40.86 10,50"
        let point1 = x + "," + y
        let point2 = x + shapeSize/2 + "," + (y-(Math.sqrt(3) * shapeSize)/2)
        let point3 = x + shapeSize + "," + y
        points = `${point1} ${point2} ${point3}`
    }

    onMount(()=>{
        buildPointsList();
        rotate();
    });

    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    }

    $: styles = `
    transform: rotate(${rotation}deg)   
    `
    let backer = 'translate(15%, 15%)'
</script>



{#if visible}
    <polygon transition:fade class="backer" style={styles+backer} points="{points}" />
    <polygon transition:fade class="{colorClass}" style={styles} points="{points}" />
{/if}



<style>
</style>