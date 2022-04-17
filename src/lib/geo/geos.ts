export let shapeSize:number = 50;
export let colorCount:number = 4;
export let animTime:number = 2000;
export function geoHover(node){

    function handleOver(){

    }
    function handleOut(){

    }
    node.addEventListener('mouseover', handleOver)
    node.addEventListener('mouseout', handleOut)
    return{
        destory(){
            node.removeEventListener('mouseover', handleOver)
            node.removeEventListener('mouseout', handleOut)
        }
    }
}


export function getColorClass():string {
    // get random num between 1 - 8
    let num = Math.floor(Math.random() * (colorCount) + 1);
    return 'geo-c' + num;
}