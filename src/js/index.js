const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const selectedDaysArray = [];
const mealsArray=[];
const savedMealsArray = [];

function daySelect () {
    var choicesContainer = document.getElementById("daySelector");

    days.forEach(day => {
        console.log(day);
        const dayBtnContainer = document.createElement("div");
        dayBtnContainer.innerHTML = `
            <button name="dayBtn" id="`+day+`" value="false" class="daySelectorBtnInactive" onClick=daySelectChange("`+day+`")>`+day+`</button>
        `;
        dayBtnContainer.className= "daySelectorContainer";
        choicesContainer.appendChild(dayBtnContainer);
    });

    const daySelectionContainer = document.getElementById("daySelectionContainer");
    const daySubmitBtn = document.createElement("div");
    daySubmitBtn.innerHTML = `
            <button name="daySubmit" id="daySubmit" class="daySelectorSubmitBtn" onClick=daySelectSubmit()>Submit</button>
    `;
    daySubmitBtn.className= "daySelectorSubmitBtnContainer";
    daySelectionContainer.appendChild(daySubmitBtn);
}

function daySelectChange (activeBtn) {
    console.log("successs");
    console.log(activeBtn);

    const targetChange = activeBtn;
    const targetElement = document.getElementById(targetChange);
    const selectedDay = targetElement.value;

    console.log(targetElement);
    console.log(selectedDay);

    if(selectedDay === "true"){
        targetElement.className = "daySelectorBtnInactive";
        targetElement.value = "false";
        console.log("true");
    } if(selectedDay === "false"){
        targetElement.className = "daySelectorBtnActive";
        targetElement.value = "true";
        console.log("false");
    }
}

function daySelectSubmit (param) {
    console.log("submit Successful");
    console.log(param);

    const daySubmitElementContainer = document.getElementById("daySelector").children;
    const daySubmitElement = daySubmitElementContainer.children;

    console.log(daySubmitElement);
    console.log(daySubmitElementContainer);
    console.log(selectedDaysArray);

    for (let i = 0; i < daySubmitElementContainer.length; i++) {
        var element = daySubmitElementContainer[i];
        var elementChildren = element.children
        
        console.log(element);
        console.log(elementChildren);
        console.log(elementChildren.value);

        for (let i = 0; i < elementChildren.length; i++) {
            var elementLoop = elementChildren[i];
            var elementLoopValue = elementLoop.value;
            var elementLoopId = elementLoop.id;
            
            console.log(elementLoop);
            console.log(elementLoopValue);
            console.log(elementLoopId)

            if (elementLoopValue === "true") {
                selectedDaysArray.push(elementLoopId)
                console.log(elementLoopId)
            }
            
            console.log(selectedDaysArray);
        }
    }
    document.getElementById("daySelectionContainer").style.display = "none";
    showRandomMealBtn();
}

function showRandomMealBtn () {
    var mealSelectionDest = document.getElementById("mealSelectionContainer");
    var mealSelectionElement = document.createElement("div");
        mealSelectionElement.className = "randomMealBox";
        mealSelectionElement.innerHTML = `
            <button id="getMealBtn" class="getMealBtn" onclick=findAMeal()>Find a Meal</button>
            <div id="activeMealContainer" class="activeMealContainer"></div>
        `;
        mealSelectionDest.appendChild(mealSelectionElement);
        console.log("appendedChild")
}

function findAMeal () {
    var findMealBtn = document.getElementById("getMealBtn");
    findMealBtn.style.display = "none";
    getRandomMeal();
}

function getRandomMeal() {
    console.log("clicked");
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((randomData) => {
            const meal = randomData.meals[0];
            console.log(meal);
            mealsArray.push(meal);
            console.log(mealsArray);
            showRandomMeal(meal);
        });
}

function showRandomMeal (meal) {
    var randomMealDest = document.getElementById("activeMealContainer");
    var mealName = meal.strMeal;
    var mealImg = meal.strMealThumb;
    var mealId = meal.idMeal;
        randomMealDest.innerHTML = `
            <div class="randomMealName" id="`+mealName+`">`+mealName+`</div>
            <div class="randomMealImage" id="`+mealName+`">
                <img src="`+mealImg+`" alt="`+mealName+`"></img>
            </div>
            <div class="randomMealBtns">
                <button class="randomMealBtn" onclick="getRandomMeal()">Find Another Meal</button>
                <button class="saveMealBtn" id="savedMealBtn" onclick="saveMeal(`+mealId+`)">Save Meal</button>
                <button class="finishBtn" id="finishBtn" onclick="saveMeal(`+mealId+`)">Finish</button>
            </div>
        `;
}

function saveMeal (mealParam) {
    var savedMealsBg = document.getElementById("savedMealsContainer");
        savedMealsBg.style.backgroundColor = "lightblue";
    var hideSaveMealBtn = document.getElementById("savedMealBtn");
        hideSaveMealBtn.style.display = "none";
    mealsArray.forEach(meal => {
        var mealData = JSON.stringify(mealParam);
        var mealId = meal.idMeal;
        console.log(meal);
        console.log(mealId);
        console.log(mealData);
        if(mealId === mealData) {
            console.log("matched");
            savedMealsArray.push(meal);
            addSavedMealtoDOM(mealId);
        } else {
            console.log("else");
        }
    })
}

function addSavedMealtoDOM (savedMealParam) {
    savedMealsArray.forEach(meal => {
        var savedMealName = meal.strMeal;
        var savedMealImg = meal.strMealThumb;
        var savedMealId = meal.idMeal;
        console.log(savedMealId);
        console.log(savedMealParam);
        if(savedMealId === savedMealParam) {
            var savedMealDest = document.getElementById("savedMealsContainer");
            var savedMealCard = document.createElement("div");
                savedMealCard.innerHTML = `
                    <div class="savedMealName" id="`+savedMealName+`">`+savedMealName+`</div>
                    <div class="savedMealImg" id="`+savedMealName+`">
                        <img src="`+savedMealImg+`" alt="`+savedMealName+`"></img>
                    </div>
                `;
                savedMealCard.className = "savedMealCard";
                savedMealCard.id = savedMealId;
                savedMealDest.appendChild(savedMealCard);
        }
        var duplicateCheck = document.getElementById(savedMealId);
        console.log(duplicateCheck);
    })
}
    


daySelect();