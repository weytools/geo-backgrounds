<script lang="ts">
	import { svg_element } from "svelte/internal";
	import { colorCount, shapeSize } from "./geo/geos";
	import { onMount } from "svelte";
	import type { BgElement } from "src/types/bgelement.type";
	import Shape from "./geo/Shape.svelte";
	import Square from "./geo/Square.svelte";
	import Circle from "./geo/Circle.svelte";
	import Triangle from "./geo/Triangle.svelte";
	import Squiggle from "./geo/Squiggle.svelte";
	import Cross from "./geo/Cross.svelte";
	import Spacer from "./geo/Spacer.svelte";
	import anime from 'animejs/lib/anime.es.js';


	let strokeSize = 0.25;
	

	$: dynamicStyles = `--stroke-size: ${strokeSize}rem`
	$: bgElements = []

	// constructor
	// shapeSize now defined in geos.ts
	let blockSize = 200
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
				

				// get random shape
				let shape = getRandomGeo();
				// create shape
				let newElement: BgElement = {
					component: shape.component,
					xPos: finalX,
					yPos: finalY,
					bgPos: {col: c, row: r}	
				}
				// place element
				bgElements = [...bgElements, newElement]

			}
		}
		anime({
		targets: document.querySelector('#svg-background').children,
		opacity: [0,1],
		duration: 3000
	}).play()
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


	function getRandomGeo(){
		// set nums
		var sum = 0
		var seed = Math.floor((Math.random() * 100))/100
		var availGeos = geos.filter(g => g.cooldown < 1)
		console.log('availGeos:', availGeos)
		// get max chance
		let weightedChance = 0
		availGeos.forEach(c => {weightedChance += c.freq})

		// lengths
		var fullLen = geos.length
		var availLen = availGeos.length

		console.log(geos)

		// loop thru geos and choose one
		for (var i = 0; i < fullLen; i++) {
			let geo = geos[i]
			console.log('geo:', geo)
			// skip if it's in cooldown
			if (geo.cooldown > 0) {
				continue;
			}
			// chance % to choose this geo
			let chance = geo.freq/weightedChance;
			
			sum += chance;

			// match
			if (seed <= sum) {

				geos.forEach(g => {
					if (g.cooldown > 0){ 
						g.cooldown = g.cooldown - 1
					}
				});

				geos[i].cooldown = geos[i].cooldown + 1
				return geo
			}
		}
	}

	let geos = [
		{
			name: "square",
			freq: 0.6,
			cooldown: 0,
			component: Square
		},
		{
			name: "circle",
			freq: 0.6,
			cooldown: 0,
			component: Circle
		},
		{
			name: "triangle",
			freq: 0.8,
			cooldown: 0,
			component: Triangle
		},
		{
			name: "soft-squig",
			freq: 0.3,
			cooldown: 0,
			component: Squiggle
		},
		{
			name: "cross",
			freq: 1.0,
			cooldown: 0,
			component: Cross
		},
		{
			name: "spacer",
			freq: 1.0,
			cooldown: 3,
			component: Spacer
		},
	]


</script>

<svg
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
	<!-- <circle class="geo-c8" cx="5" cy="40" r="5" /> -->
	<!--  triangle  -->
	<!-- <polygon class="geo-c4" points="0,50 5,40.86 10,50" /> -->
	<!--  squig not implemented -->
	<!-- <polyline class="geo-c2" points="0,55 4,60 8,55 12,60 16,55 20,60 24,55" /> -->
	<!--  X  -->
	<!-- <polyline class="geo-c6" points="0,70 10,70 5,70 5,65 5,75" /> -->
	<!--  dot not implemented -->
	<!-- <circle class="geo-c3" cx="5" cy="80" r=".5" /> -->
	<!--  round squig  -->
	<!-- <path class="geo-c7" d="M0,90  Q2.5 94, 5 90 T10 90 T15 90 T20 90 T25 90" /> -->

	<!-- grid  -->
	<!-- {#each Array(rows) as _, i}
		<rect class="grid" width="100%" height="1" x="0" y="{i*blockSize}" fill="#cccccc80" />
	{/each}
	{#each Array(cols) as _, i}
		<rect class="grid" width="1" height="100%" x="{i*blockSize}" y="0" fill="#cccccc80" />
	{/each} -->
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
		r: calc($shape-size / 2);
		stroke-linecap: round;
		stroke-linejoin: round;
		transform-origin: 50% 50%;
		transform-box: fill-box;
		// animation: rotatetest 1s ease-in-out infinite alternate;
	}
	rect.backer:not(.grid),
	circle.backer,
	polygon.backer {
        fill: hsla(180, 100%, 50%, 0.3) !important;
	}
	polyline.backer,
	path.backer {
		stroke: hsla(180, 100%, 50%, 0.3) !important;
	}
	@keyframes rotatetest {
		to {
			transform: rotate(14deg);
		}
	}
	}
</style>
