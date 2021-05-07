var grille = document.getElementById("grille")
var startButton = document.getElementById("start")

startButton.onclick = generate

function generate()
{
    let vSize = document.getElementById("tailleV").value
    let hSize = document.getElementById("tailleH").value
    grille.innerHTML = "<div class='ligne'>"
    let ligne = document.getElementsByClassName("ligne")[0]

    for(i=0;i<hSize;i++)
        ligne.innerHTML += "<div class='case'></div>"

    grille.innerHTML += "</div>"

    let fullLine = grille.innerHTML

    for(i=1;i<vSize;i++)
        grille.innerHTML += fullLine

    let caseList = document.getElementsByClassName("case");
    let count = 0;
    [].forEach.call(caseList,function(e){
        e.id = count
        e.style.backgroundColor = "lightGrey"
        e.onclick = clicked;
        count ++;
    });

    [].forEach.call(caseList,function(e){
        if(Math.floor(Math.random()*5) == 0)
        {
            e.dataset.mined = "true";
            numberz(e)
            e.innerHTML = "";
        }
    })
    
}

function numberz(elCase)
{
    let vSize = document.getElementById("tailleV").value
    let hSize = document.getElementById("tailleH").value
    let case0 = document.getElementById(elCase.id).id
    let case1 = case0 - hSize-1
    let case2 = case0 - hSize
    let case3 = case0 - hSize +1
    let case4 = case0 - 1 
    let case5 = parseInt(case0) + 1
    let case6 = parseInt(case0) + parseInt(hSize) - 1
    let case7 = parseInt(case0) + parseInt(hSize)
    let case8 = parseInt(case0) + parseInt(hSize) + 1

    if(!(case0 % hSize))
        case1 = null, case4 = null, case6 = null
    if(!((parseInt(case0)+1) % hSize))
        case3 = null, case5 = null, case8 = null

    let caseList = [case1,case2,case3,case4,case5,case6,case7,case8];
    caseList.forEach(function(value,index, array)
    {

        if(value >=0 && value != null && (value < (hSize * vSize)))
        {
            if(!document.getElementById(value).dataset.mined)
                if(!document.getElementById(value).dataset.nbMines)
                    document.getElementById(value).dataset.nbMines = 1
                else
                    document.getElementById(value).dataset.nbMines = parseInt(document.getElementById(value).dataset.nbMines) +1
    
        }
        
    })


}

function clicked()
{
    if(this.dataset.mined)
        [].forEach.call(document.querySelectorAll("[data-mined]"),function(e){
            e.style.backgroundColor = "red"
        })
    else
    {
        this.style.backgroundColor = "white"
        if(this.dataset.nbMines)
            this.innerHTML = this.dataset.nbMines
    }
}
