var httprequest = new XMLHttpRequest;
var result = [];
function pizza(category){
    httprequest.open(`Get`, `https://forkify-api.herokuapp.com/api/search?q=${category}`);
    httprequest.send();
    httprequest.onreadystatechange = function(){
       if(httprequest.readyState==4){
           result = JSON.parse(httprequest.response).recipes;
           displaydata();
       }
}
}
function displaydata(){
    var data="";
    for(var i=0; i<result.length; i++){
        data+=`
        <div class="col-lg-3">
           <div class="recipe">
               <h2>${result[i].title}</h2>
               <img src="${result[i].image_url}" class="img-fluid"/>
               <a href="recipe.html?rId=${result[i].recipe_id}">read more</a>
           </div>
        </div>
        `;
    }
    document.getElementById("postsection").innerHTML = data;
}
var alllinkes = document.querySelectorAll(".nav-link");
for(var i=0;i<alllinkes.length;i++){
    alllinkes[i].addEventListener('click',function(e){pizza(e.target.innerHTML);})
}

const recipedetails = new URLSearchParams(window.location.search);
const recipe_id = recipedetails.get('rId');
var recipeingredient = new XMLHttpRequest();
var details=[];
    recipeingredient.open(`Get`, `https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`);
    recipeingredient.send();
    recipeingredient.onreadystatechange = function(){
       if(recipeingredient.readyState == 4){
          details = JSON.parse(recipeingredient.response).recipe;
           display();
       }
    }
function display(){
    var recdetail="";
    recdetail+= `
    <div>
    <img src="${details.image_url}" class="img-fluid"/>
    <h2>${details.title}</h2>
    <p>${details.ingredients}</p>
    </div>
    `
    document.getElementById("recipesingredients").innerHTML = recdetail;
}