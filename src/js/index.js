const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const selectedDaysArray = [];
const mealsArray=[];
const savedMealsArray = [];

// Stage I: Select the Days User Wants to Plan Meals For.
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
            <button name="daySubmit" id="daySubmit" class="daySelectorSubmitBtn" onClick=daySelectSubmit()>Select Days</button>
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
    var hideDaySubmitBtn = document.getElementById("daySubmit");
        hideDaySubmitBtn.display="none";
    showMealFinder();
}

// Stage II: Adding Meals to the Saved Meal Array
function showMealFinder () {
    var hideSchedule = document.getElementById("buildingContainer");
        hideSchedule.style.display = "none";
    var showMealFinder = document.getElementById("mealSelectionContainer");
        showMealFinder.style.display = "flex";
    var mealSelectionDest = document.getElementById("mealSelectionContainer");
    var hideMealFinderBtn = document.getElementById("mealFinderBtn");
        hideMealFinderBtn.style.display = "none";
    var hideChangeDaysBtn = document.getElementById("changeDaysBtn");
        hideChangeDaysBtn.style.display = "none";
    var showScheduleBtn = document.getElementById("scheduleBtn");
        showScheduleBtn.style.display = "flex";
        mealSelectionDest.innerHTML = `
            <div id="searchFilterContainer" class="searchFilterContainer">
                <button class="randomMealBtn" onclick="fetchRandomMeal()">Find Another Meal</button>
            </div>
            <div id="activeMealContainer" class="activeMealContainer">
            </div>
        `;
        fetchRandomMeal();
}

function fetchRandomMeal() {
    console.log("clicked");
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((randomData) => {
            const meal = randomData.meals[0];
            console.log(meal);
            mealsArray.push(meal);
            console.log(mealsArray);
            console.log(savedMealsArray);
            displayRandomMeal(meal);
        });
}

function displayRandomMeal (meal) {
    var randomMealDest = document.getElementById("activeMealContainer");
    var mealName = meal.strMeal;
    var mealImg = meal.strMealThumb;
    var mealId = meal.idMeal;
        randomMealDest.innerHTML = `
            <div class="randomMealName" id="`+mealName+`">
                <div id="randomMealNameTxt" class="randomMealNameTxt">
                    `+mealName+`
                </div>
                <div class="randomMealBtns">
                    <button class="saveMealBtn" id="saveMealBtn" onclick="saveMeal(`+mealId+`)">Save Meal</button>
                    <button class="saveMealBtnActive" id="saveMealBtnActive" onclick="unsaveMeal(`+mealId+`)">Saved</button>
                </div>
            </div>
            <div class="randomMealImage" id="`+mealName+`">
                <img src="`+mealImg+`" alt="`+mealName+`"></img>
            </div>
        `;
}

function saveMeal (mealParam) {
    var savedMealsBg = document.getElementById("savedMealsContainer");
        savedMealsBg.style.backgroundColor = "lightblue";
    var hideSaveMealBtn = document.getElementById("saveMealBtn");
        hideSaveMealBtn.style.display = "none";
    var showSaveMealBtnActive = document.getElementById("saveMealBtnActive");
        showSaveMealBtnActive.style.display = "flex";
    mealsArray.forEach(meal => {
        var mealData = JSON.stringify(mealParam);
        var saveMealId = meal.idMeal;
        console.log(meal);
        console.log(saveMealId);
        console.log(mealData);
        if(saveMealId === mealData) {
            console.log("Save Meal ID Matched");
            duplicateObjCheck(meal);
        } else {
            console.log("Saved Meal IDs Mismatched");
        }
    })
}

function duplicateObjCheck (duplicateParam) {
    var duplicateTargetId = duplicateParam.idMeal;
    var findDuplicateObject = savedMealsArray.find(element => element.idMeal === duplicateTargetId);
        console.log(duplicateParam);
        console.log(duplicateTargetId);
        console.log(findDuplicateObject);
    if(!findDuplicateObject === true) {
        var savedMealsLength = savedMealsArray.length;
        var test = duplicateParam.position = savedMealsLength;
            console.log(test);
        test;
        savedMealsArray.push(duplicateParam);
        addSavedMealtoDOM(duplicateTargetId);
            console.log("meal added");
    } else {
        console.log("duplicate detected");
        addSavedMealtoDOM(duplicateTargetId);
    }
    console.log(savedMealsArray);
}

function addSavedMealtoDOM (savedMealParam) {
    var showScheduleBtnLocation = document.getElementById("scheduleBtn");
        showScheduleBtnLocation.style.display = "flex";
    savedMealsArray.forEach(meal => {
        var savedMealName = meal.strMeal;
        var savedMealImg = meal.strMealThumb;
        var savedMealId = meal.idMeal;
        console.log(savedMealId);
        console.log(savedMealParam);
        if(savedMealId === savedMealParam) {
            var savedMealDest = document.getElementById("savedMealsDest");
            var savedMealCard = document.createElement("div");
                savedMealCard.innerHTML = `
                    <div id="`+savedMealId+`" class="savedMealCard" draggable="true" ondragstart="drag(event)">
                    <div class="savedMealName" id="`+savedMealName+`">`+savedMealName+`</div>
                    <div class="savedMealImg" id="`+savedMealName+`">
                        <img src="`+savedMealImg+`" draggable="false" alt="`+savedMealName+`"></img>
                    </div>
                    <div class="savedMealBtns">
                        <button class="savedMealDeleteBtn" onclick="unsaveMeal(`+savedMealId+`)">Remove</button>
                    </div>
                    </div>
                `;
                savedMealCard.className = "savedMealCard";
                savedMealCard.name = "savedMealCard";
                savedMealCard.id = savedMealId;
                savedMealCard.draggable = true;
                savedMealDest.appendChild(savedMealCard);
            var savedMealDragTarget = document.getElementById(savedMealId);
                savedMealDragTarget.onchange = "handleDragstart(event)";

        }
    })
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev);
}
  
  function drop(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(ev.target);
    var dataTarget = ev.target;
    var dataId = dataTarget.id;
    console.log(dataTarget)
    console.log(dataId);
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
  }

function unsaveMeal (unsaveMealParam) {
        console.log(unsaveMealParam);
    var unsaveMealId = JSON.stringify(unsaveMealParam);
    var unsaveMealDiv = document.getElementById(unsaveMealId);
    var showSaveMealBtn = document.getElementById("saveMealBtn");
        showSaveMealBtn.style.display = "flex";
    var hideSaveMealBtnActive = document.getElementById("saveMealBtnActive");
        hideSaveMealBtnActive.style.display = "none";
    var mealPosition = 0;
    var deletedMealCount = 0;
    var newPosition = 0;
    savedMealsArray.forEach(meal => {
            console.log(mealPosition);
        var unsaveMealLoopId = meal.idMeal;
        if(unsaveMealLoopId === unsaveMealId) {
            var targetMealPosition = meal.position;
                console.log(targetMealPosition);
                console.log(savedMealsArray)
            savedMealsArray.splice(targetMealPosition, 1);
                unsaveMealDiv.remove();
                deletedMealCount ++;
                console.log("Successfully Deleted");
                console.log(meal);
                console.log(mealPosition);
            savedMealsArray.forEach(meal => {
                console.log(newPosition);
                meal.position = newPosition;
                console.log(meal);
                newPosition++;
                console.log(newPosition);
            })
        }
        mealPosition++;
    })
    mealPosition = 0;
        console.log(mealPosition);
        console.log(savedMealsArray);
}

// Step III: Build Meal Schedule From Saved Meals Container
function showSchedule () {
    var hideMealFinder = document.getElementById("mealSelectionContainer");
        hideMealFinder.style.display = "none";
    var showSchedule = document.getElementById("buildingContainer");
        showSchedule.style.display = "flex";
    var showMealFinderBtn = document.getElementById("mealFinderBtn");
        showMealFinderBtn.style.display = "flex";
    var hideScheduleBtn = document.getElementById("scheduleBtn");
        hideScheduleBtn.style.display = "none";
    var showChangeDaysBtn = document.getElementById("changeDaysBtn");
        showChangeDaysBtn.style.display = "flex";
    buildEmptySchedule();
}

function buildEmptySchedule () {
    selectedDaysArray.forEach(day => {
        var dayValue = JSON.stringify(day);
            console.log(day);
            console.log(dayValue);
        var dayCheckElement = document.getElementById(dayValue);
            console.log(dayCheckElement);
            if(dayCheckElement === null){
                var scheduleDayTarget = document.getElementById("buildingContainer");
                var builderDayContainer = document.createElement("div");
                    builderDayContainer.innerHTML = `
                        <div 
                            id="builderDayTitle" 
                            class="builderDayTitle"
                        >
                            `+dayValue+`
                        </div>
                        <div 
                            id="`+day+`Breakfast"  
                            class="builderMealContainer" 
                            ondrop="drop(event)" 
                            ondragover="allowDrop(event)"
                        >
                            Breakfast
                        </div>
                        <div 
                            id="`+day+`Lunch" 
                            class="builderMealContainer" 
                            ondrop="drop(event)" 
                            ondragover="allowDrop(event)"
                        >
                            Lunch
                        </div>
                        <div 
                            id="`+day+`Dinner"
                            class="builderMealContainer" 
                            ondrop="drop(event)" 
                            ondragover="allowDrop(event)"
                        >
                            Dinner
                        </div>
                    `;
                    builderDayContainer.id = dayValue;
                    builderDayContainer.className = "builderDayContainer";
                    builderDayContainer.ondrop = "drop(event)";
                    builderDayContainer.ondragover = "allowDrop(event)";
                    scheduleDayTarget.appendChild(builderDayContainer);
            }
        
    })
}

function showDayChangeMenu () {
    var daySelectorMenu = document.getElementById("daySelectionContainer");
        daySelectorMenu.style.display = "flex";
    var showChangeDaysBtn = document.getElementById("changeDaysBtn");
        showChangeDaysBtn.style.display = "flex";
    var showChangeDaysBtn = document.getElementById("changeDaysBtn");
        showChangeDaysBtn.style.display = "flex";
}

daySelect();