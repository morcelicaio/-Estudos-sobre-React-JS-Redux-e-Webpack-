export function selectTab(tabId){
    
    return{
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

// operador rest recebe uma lista de parâmetros e os transforma em um array.
//Ex: na chamada da função: showTabs('tabList', 'tabCreate');    irá se tornar  ['tabList', 'tabCreate']
export function showTabs(...tabsId){
    const tabsToShow = {}

    // para cara tab que foi passada, cria-se um novo tributo no objeto que terá seu valor true.
    tabsId.forEach( tab =>{
        tabsToShow[tab] = true
    })

    return{
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }

}