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
            <div id="mealContainer" class="mealcontainer"></div>
            <button id="getMealBtn" class="getMealBtn" onclick=getRandomMeal()>randomMealButton</button>
        `;
        mealSelectionDest.appendChild(mealSelectionElement);

    console.log("appendedChild")
}


daySelect();