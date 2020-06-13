
function populateUFs(){
   
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //funçõ anonima que retorna 
    .then( states => {

        for( const state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //acesso ao html
        }
        
    })
}

populateUFs()

function getCities(event){
const citySelect = document.querySelector("select[name=city]")
const stateInput = document.querySelector("input[name=state]")

   const ufValue = event.target.value

   const indexOfSelectedState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //funçõ anonima que retorna 
    .then( cities => {

        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //acesso ao html
        }
        
        citySelect.disabled = false
    })


}


document
    .querySelector("select[name=uf]") //procure o select que tem uf
    .addEventListener("change", getCities )//vai escutar os eventos //função anonima
    
    
//itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")
   
    for(const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    // adicionar ou remover uma classe com JS //seleciona mais de uma opção
    itemLi.classList.toggle("selected") //ñ existe selected, ai ele adiciona

    
    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)


    //verificar se exitem intens selecionados, se sim
    //pegar os iten  selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    //se ja estiver selecionado, tirar da selecao
    if( alreadySelected >= 0){
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{
        //se não estiver, adicionar a seleção
        //adicionar a selecao
        selectedItems.push(itemId)

    }
    console.log('selectedItems', selectedItems)
    //atualizar o campo escondido com o itens selecionados 
    collectedItems.value = selectedItems
    


}



