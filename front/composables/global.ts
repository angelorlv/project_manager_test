

export const useGlobal = () =>{
    let list_jour = ['Dimanche','Lundi','Mardi','Mecredi','Jeudi','Vendredi','Samedi']
    let list_mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

    function dateToText(d:Date){

        let t = new Date(d)

        let date = t.getDate()
        let j = list_jour[t.getDay()]
        let m = list_mois[t.getMonth()]
        let y = t.getFullYear()

        return j+" "+date+" "+m+" "+y

    }

    return {dateToText}
}