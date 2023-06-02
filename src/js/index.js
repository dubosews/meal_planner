const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const selectedDaysArray = [];
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
            <button id="getMealBtn" class="getMealBtn" onclick=getRandomMeal()>randomMealButton</button>
            <div id="mealContainer" class="mealcontainer"></div>
          
        `;
        mealSelectionDest.appendChild(mealSelectionElement);
        console.log("appendedChild")
}

function getRandomMeal() {
    console.log("clicked");
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((randomData) => {
            const meal = randomData.meals[0];
            console.log(meal);
            showRandomMeal(meal);
        });
}

function showRandomMeal (meal) {
    var randomMealDest = document.getElementById("mealContainer");
    var randomMealCard = document.createElement("div");
    var mealName = meal.strMeal;
    var mealImg = meal.strMealThumb;
        randomMealCard.innerHTML = `
            <div class="randomMealName" id="`+mealName+`">`+mealName+`</div>
            <div class="randomMealImage" id="`+mealName+`">
                <img src="`+mealImg+`" alt="`+mealName+`"></img>
            </div>
        `;
        randomMealCard.className = "randomMealCard";
        randomMealDest.appendChild(randomMealCard);
}

daySelect();