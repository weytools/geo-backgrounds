<script>
    import { onMount } from "svelte";
	import { shapeSize, animTime } from "./geos";
    import { fade } from "svelte/transition";
    // import { tweened } from 'svelte/motion';
    // import { cubicOut } from 'svelte/easing';


    export let x;
    export let y;
    export let colorClass;
    export let visible;

    let styles;
    // let moveX = tweened(0,{	
    //     duration: 400,
    //     easing: cubicOut
    // })
    // let moveY = tweened(0)
    let rotation = 0
    let maxRotation = 180
    let points = ''



    function buildPointsList(){
        // "0,50 5,40.86 10,50"
        // let point1 = x + "," + y
        // let point2 = x + shapeSize/2 + "," + (y-(Math.sqrt(3) * shapeSize)/2)
        // let point3 = x + shapeSize + "," + y
        // points = `${point1} ${point2} ${point3}`

        // d="M0,90  Q2.5 94, 5 90 T10 90 T15 90 T20 90 T25 90"
        let point1 = x + "," + y
        let point2 = (x+shapeSize/4) + ' ' + (y+(shapeSize*.4))
        let point3 = (x+shapeSize/2) + ' ' + y
        let point4 = (x+shapeSize) + ' ' + y
        let point5 = (x+shapeSize*1.5) + ' ' + y
        let point6 = (x+shapeSize*2) + ' ' + y
        let point7 = (x+shapeSize*2.5) + ' ' + y
        

        points = `M${point1} Q${point2}, ${point3} T${point4} T${point5} T${point6} T${point7}`
    }
    
    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    } 
    // function movement(){
    //     moveX.set(Math.floor(Math.random() * 100))
    //     moveY.set(Math.floor(Math.random() * 100))
    // }

    onMount(()=>{
        buildPointsList();
        rotate();
        
        
        // movement();
    });
$: styles = `transform: rotate(${rotation}deg) `
let backer = 'translate(4%, 25%)'
</script>


{#if visible}
    <path transition:fade class="backer" style={styles+backer}   d="{points}" />
    <path transition:fade class="{colorClass}" style={styles}   d="{points}" />
{/if}

<style>
</style>