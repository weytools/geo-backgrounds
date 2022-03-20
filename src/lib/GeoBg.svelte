<script lang="ts">
	import { svg_element } from "svelte/internal";
	import { geoHover } from "./geo/geos.js";
	import { onMount } from "svelte";
	import type { BgElement } from "src/types/bgelement.type";
	import Square from "./geo/Square.svelte";
	import Shape from "./geo/Shape.svelte";

	let strokeSize = 0.25;

	$: dynamicStyles = `--stroke-size: ${strokeSize}rem`
	$: bgElements = []

	// constructor

	let blockSize = 200
	let shapeSize = 50
	let cols;
	$: rows = 0;

	onMount(()=>{
		// build background grid
		let bg = document.getElementById('svg-background')

		let w = bg.clientWidth
		let h = bg.clientHeight

		cols = Math.ceil(w / (blockSize)) + 1
		rows = Math.ceil(h / (blockSize)) + 1

		console.log(w,h,cols,rows)

		// add elements to grid
		// coordinate helper
		for (let r = 1; r < rows; r++) {
			for (let c = 1; c < cols; c++) {
				// find random X
				let finalX = getAxisPoint(c)
				let finalY = getAxisPoint(r)
				
				// create shape
				let newElement: BgElement = {
					component: Square,
					xPos: finalX,
					yPos: finalY,
					rotation: Math.floor(Math.random() * 360)				
				}
				// place element
				bgElements = [...bgElements, newElement]

			}
		}

	})

	function getAxisPoint(i:number){

		// refactor
		let min = blockSize * (i-1)
		let max = blockSize * i

		// these are top left origin so 0,0 relative will stay in box
		// add margin for max
		max -= shapeSize

		// find random spot
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	// function getRandomGeo(){
	// 	// set nums
	// 	var sum = 0
	// 	var seed = Math.floor((Math.random() * 100))/100
	// 	var len = geos.length

	// 	// loop thru geos and choose one
	// 	for (var i = 0; i < len; i++) {
	// 		let geo = geos[i]
	// 		// skip if it's in cooldown
	// 		if (geo.cooldown > 0) {
	// 			geos[i].cooldown--;
	// 			continue;
	// 		}
	// 		// chance % to choose this geo
	// 		let chance = geo.freq/len;
	// 		sum += chance;

	// 		if (seed <= sum) {
	// 			return geo
	// 		}
	// 	}
	// }

	let geos = {
		"square":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"circle":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"triangle":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"sharp-squig":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"soft-squig":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"dot":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"plus":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
		"spacer":{
			freq: 1.0,
			cooldown: 0,
			component: Square
		},
	}
</script>

<svg
	on:click={()=>console.log('hi')}
	id="svg-background"
	class="geo"
	viewBox="0 0 100% 100%"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	style={dynamicStyles}
	preserveAspectRatio="xMinYMin"
>
	{#each bgElements as bgElement}
		<svelte:component this={Shape} element={bgElement}/>
	{/each}

	<!--  square  -->
	<!-- <Square on:mouseover={()=>console.log(this)} x="10" y="10" /> -->
	<!--  circle  -->
	<circle class="geo-c8" cx="5" cy="40" r="5" />
	<!--  triangle  -->
	<polygon class="geo-c4" points="0,50 5,40.86 10,50" />
	<!--  squig  -->
	<polyline class="geo-c2" points="0,55 4,60 8,55 12,60 16,55 20,60 24,55" />
	<!--  X  -->
	<polyline class="geo-c6" points="0,70 10,70 5,70 5,65 5,75" />
	<!--  dot  -->
	<circle class="geo-c3" cx="5" cy="80" r=".5" />
	<!--  round squig  -->
	<path class="geo-c7" d="M0,90  Q2.5 94, 5 90 T10 90 T15 90 T20 90 T25 90" />

	<!-- grid  -->
	{#each Array(rows) as _, i}
		<rect class="grid" width="100%" height="1" x="0" y="{i*blockSize}" fill="#cccccc80" />
	{/each}
	{#each Array(cols) as _, i}
		<rect class="grid" width="1" height="100%" x="{i*blockSize}" y="0" fill="#cccccc80" />
	{/each}
	<rect class="grid" width="0.5" height="15" x="0" y="-7.5" fill="#ccc" />
</svg>

<style lang="scss">

	// COLORS
	@use "sass:list";
	$geo-colors: #00c7b0, #ffce52, #ffa257, #ff6038, #00c717, #ff525a, #ff578c, #ff38a9;
	$geo-light: #b9d5ee;
	$geo-dark: #121212;
	
	:root {
		@for $i from 1 through length($geo-colors){
			--geo-c#{$i}: #{list.nth($geo-colors, $i)};
		}
		--geo-cd: #{$geo-dark};
		--geo-cl: #{$geo-light};
	}

	@for $i from 1 through length($geo-colors){
		:global .geo-c#{$i} {
			stroke: var(--geo-c#{$i});
		}
	}


	// ELEMENTS

	$shape-size: 50px;

	:global svg.geo {
	background-color: var(--geo-cd);
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;

	rect:not(.grid),
	circle,
	polygon,
	polyline,
	path {
		fill: transparent;
		stroke-width: var(--stroke-size);
		height: $shape-size;
		width: $shape-size;
		stroke-linecap: round;
		stroke-linejoin: round;
		transform-origin: 50% 50%;
		transform-box: fill-box;
		// animation: rotatetest 1s ease-in-out infinite alternate;
	}
	@keyframes rotatetest {
		to {
			transform: rotate(14deg);
		}
	}
	}
</style>
