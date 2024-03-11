//movement functions to get player to jump
const player = document.getElementById('Nin');

function Jump() {
    if(Nin.classList != 'jmp') {
        Nin.classList.add("jmp")
        
        setTimeout(function () {
            Nin.classList.remove('jmp');
        } ,400) 
    }
}
    
    
    document.addEventListener("keydown", function(evt){
        Jump();
    })
