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


	let strokeSize = 0.25;

	let test: BgElement = {
		component: Spacer,
		xPos: 1,
		yPos: 1,
		bgPos: {col: 1, row: 1}
	}
	

	$: dynamicStyles = `--stroke-size: ${strokeSize}rem`
	$: bgElements = []

	// constructor
	// shapeSize now defined in geos.ts
	let blockSize = 200
	let cols;
	$: rows = 0;
	let elCount:number = 0;

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
		shuffleGeos(bgElements)

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
		// get max chance
		let weightedChance = 0
		availGeos.forEach(c => {weightedChance += c.freq})

		// lengths
		var fullLen = geos.length
		var availLen = availGeos.length

		// loop thru geos and choose one
		for (var i = 0; i < fullLen; i++) {
			let geo = geos[i]
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

	function shuffleGeos(geoArray:BgElement[]){
		geoArray.sort(function(a,b){
			let aType = a.component.name
			let bType = b.component.name

			// sort spacers at the end
			if (aType.includes('Spacer') && bType.includes('Spacer'))
			{
				return 0;
			}
			if (aType.includes('Spacer'))
			{
				return 1;
			}
			if (bType.includes('Spacer'))
			{
				return -1;
			}
			
			// randomize the rest
			return 0.5 - Math.random();
		});
		console.log(geoArray)
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
			freq: 0.8,
			cooldown: 3,
			component: Spacer
		},
	]


</script>






<svg
	id="svg-frame"
	viewBox="0 0 100% 100%"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="xMinYMin">

	<rect class="frame geo-c1" width="100%" height="100%" />
</svg>
<svg
	id="svg-background"
	class="geo"
	viewBox="0 0 100% 100%"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	style={dynamicStyles}
	preserveAspectRatio="xMinYMin"

>
	{#each bgElements as bgElement, i}
		<svelte:component this={Shape} element={bgElement} delay={i}/>
	{/each}

</svg>









<style lang="scss">

	// COLORS
	@use "sass:list";
	//$geo-colors: #00c7b0, #ffce52, #ffa257, #ff6038, #00c717, #ff525a, #ff578c, #ff38a9;
	//$cool: #FF6AD5, #C774E8, #AD8CFF, #8795E8, #94D0FF;
	//$crystal-pepsi: #FFCCFF, #F1DAFF, #E3E8FF, #CCFFFF;
	$geo-colors: #FFCCFF, #F1DAFF, #E3E8FF, #CCFFFF;
	$geo-light: #FFF;
	$geo-dark: #121212;
	
	:root {
		@for $i from 1 through length($geo-colors){
			--geo-c#{$i}: #{list.nth($geo-colors, $i)};
		}
		--geo-cd: #{$geo-dark};
		--geo-cl: #{$geo-light};
		--backer-c: #FFFFCC;
	}

	@for $i from 1 through length($geo-colors){
		:global .geo-c#{$i} {
			stroke: var(--geo-c#{$i});
		}
	}


	// ELEMENTS

	$shape-size: 50px;

	:global svg.geo {
	background-color: var(--geo-cl);
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;

	rect:not(.grid):not(.geo-border),
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
        fill: var(--backer-c) !important;
	}
	polyline.backer,
	path.backer {
		stroke: var(--backer-c) !important;
	}
}

#svg-frame {
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 2;
	pointer-events: none;
}
rect.frame {
	stroke: #ACF;		
	stroke-width: 4rem;
	fill: transparent;
}
</style>
