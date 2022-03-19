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