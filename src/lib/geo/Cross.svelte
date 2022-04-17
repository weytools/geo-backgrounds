<script>
    import { onMount } from "svelte";
	import { shapeSize } from "./geos";
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

        // <polyline class="geo-c6" points="0,70 10,70 5,70 5,65 5,75" />
        let armLen = shapeSize/10

        let point1 = x + "," + y
        let point2 = (x+armLen*2) + ' ' + y
        let point3 = (x+armLen) + ' ' + y
        let point4 = (x+armLen) + ' ' + (y-armLen)
        let point5 = (x+armLen) + ' ' + (y+armLen)
        

        points = `${point1} ${point2}, ${point3} ${point4} ${point5}`
    }
    
    function rotate(){
        rotation = Math.floor(Math.random() * maxRotation)
    } 

    onMount(()=>{
        buildPointsList();
        rotate();
        
    });
$: styles = `transform: rotate(${rotation}deg);`

</script>


{#if visible}
<polyline transition:fade class="{colorClass}" style={styles}   points="{points}" />
{/if}



<style lang="scss">
    $rotate: floor(random(90));

    polyline {
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