<script lang="ts">
	import { svg_element } from "svelte/internal";
	import Square from "./geo/Square.svelte";

	let strokeSize = 0.05;

	$: dynamicStyles = `--stroke-size: ${strokeSize}rem`;

	function bigger() {
	strokeSize += 0.01;
	}
	function fillup() {
	let gap = 50;
	let w = this.getBoundingClientRect().width;
	let h = this.getBoundingClientRect().height;
	if (h < w) {
		let hratio = h / 200;
		let wvisible = w / hratio;

		var cols = Math.floor(wvisible / gap);
		var rows = Math.floor(h / 100);
	} else {
		var cols = Math.floor(w / gap);
	}

	for (let i = 0; i < cols; i++) {
		let sq = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		sq.classList.add("geo-c" + Math.floor(Math.random() * 8 + 1));
		let xcoord = Math.floor(Math.random() * gap + i * gap).toString();
		sq.setAttribute("x", xcoord);
		sq.setAttribute("y", "10");
		let rotation = Math.floor(Math.random() * 89);
		sq.setAttribute("style", `transform: rotate(${rotation}deg);`);
		this.appendChild(sq);
	}
	}

	let geos = [
	{
		type: "square",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "circle",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "triangle",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "sharp-squig",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "soft-squig",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "dot",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "plus",
		freq: 1.0,
		cooldown: 0,
	},
	{
		type: "spacer",
		freq: 1.0,
		cooldown: 0,
	},
	];

	function randoms(){

		var sum = 0
		console.log('sum:', sum)
		var r = Math.floor((Math.random() * 100))/100
  		console.log('%c%s', 'color: #00a3cc', r);
		console.log('r:', r)
		var len = geos.length

	for (var i = 0; i < len; i++) {
		let geo = geos[i]
		console.log('geo', geo)

		// percentage of 1
		let perc = geo.freq/len
		sum += perc
		console.log('perc:', perc, 'sum:', sum)
		if (r <= sum){
		console.log('Took '+(i+1)+' tries', 'Picked', geo)
		break
		}
	}
	}
</script>

<svg
	on:click={fillup}
	class="geo"
	viewBox="0 0 200 200"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	style={dynamicStyles}
	preserveAspectRatio="xMinYMin"
>
	<!-- <defs>
		<pattern id="smallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
			<path d="M 5 0 L 0 0 0 5" fill="none" stroke="#FFFFFF05" stroke-width="0.5"/>
		</pattern>
		<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
			<rect class="grid" width="10" height="10" fill="url(#smallGrid)"/>
			<path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFFFFF10" stroke-width="1"/>
		</pattern>
		</defs>
		<rect class="grid base" fill="url(#grid)" /> -->

	<!--  square  -->
	<Square />
	<!--  circle  -->
	<circle class="geo-c8" cx="5" cy="30" r="5" />
	<!--  triangle  -->
	<polygon class="geo-c4" points="0,50 5,40.86 10,50" />
	<!--  squig  -->
	<polyline class="geo-c2" points="0,55 4,60 8,55 12,60 16,55 20,60 24,55" />
	<!--  X  -->
	<polyline class="geo-c6" points="0,70 10,70 5,70 5,65 5,75" />
	<!--  dot  -->
	<circle class="geo-c3" cx="5" cy="80" r=".5" />
	<!--  round squig  -->
	<path on:click={randoms} class="geo-c7" d="M0,90  Q2.5 94, 5 90 T10 90 T15 90 T20 90 T25 90" />

	<!-- 0,0 cross   -->
	<rect class="grid" width="15" height="0.5" x="-7.5" y="0" fill="#ccc" />
	<rect class="grid" width="0.5" height="15" x="0" y="-7.5" fill="#ccc" />
</svg>

<style lang="scss">
	:root {
	--geo-clight: #b9d5ee;
	--geo-cdark: #1c333c;
	--geo-c1: #00c7b0;
	--geo-c2: #ffce52;
	--geo-c3: #ffa257;
	--geo-c4: #ff6038;

	--geo-c5: #00c717;
	--geo-c6: #ff525a;
	--geo-c7: #ff578c;
	--geo-c8: #ff38a9;
	}
	:global .geo-cd {
	stroke: var(--geo-cdark);
	}
	:global .geo-cl {
	stroke: var(--geo-clight);
	}
	:global .geo-c1 {
	stroke: var(--geo-c1);
	}
	:global .geo-c2 {
	stroke: var(--geo-c2);
	}
	:global .geo-c3 {
	stroke: var(--geo-c3);
	}
	:global .geo-c4 {
	stroke: var(--geo-c4);
	}
	:global .geo-c5 {
	stroke: var(--geo-c5);
	}
	:global .geo-c6 {
	stroke: var(--geo-c6);
	}
	:global .geo-c7 {
	stroke: var(--geo-c7);
	}
	:global .geo-c8 {
	stroke: var(--geo-c8);
	}

	:global svg.geo {
	background-color: var(--geo-cdark);
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
		height: 10px;
		width: 10px;
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

	.grid.base {
	width: inherit;
	height: inherit;
	transform: translate(-100%, -100%);
	}
</style>
