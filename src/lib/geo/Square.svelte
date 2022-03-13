<script>
    import { onMount } from "svelte";

    export let x;
    export let y;
    
    onMount(()=>{
        initRotate();
        initColor();
    })
    let x = 0;
    let y = 10;
    function moveX(){
        x += 1;
    }

    let rotation = 0
    console.log('rotation:', rotation)
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