// var daySelectionState = [
//     {"id": 0, "name": "monday", "value": "inactive"}, 
//     {"id": 1, "name": "tuesday", "value": "inactive"},
//     {"id": 2, "name": "wednesday", "value": "inactive"},
//     {"id": 3, "name": "thursday", "value": "inactive"},
//     {"id": 4, "name": "friday", "value": "inactive"},
//     {"id": 5, "name": "saturday", "value": "inactive"},
//     {"id": 6, "name": "sunday", "value": "inactive"}
// ];

let daySelectionState = [
    {"id": 0, "name": "monday", "value": "false"}, 
    {"id": 1, "name": "tuesday", "value": "false"},
    {"id": 2, "name": "wednesday", "value": "false"},
    {"id": 3, "name": "thursday", "value": "false"},
    {"id": 4, "name": "friday", "value": "false"},
    {"id": 5, "name": "saturday", "value": "false"},
    {"id": 6, "name": "sunday", "value": "false"}
];

// Constructor function for Person objects
function Weekday(id, dayName, value) {
    this.id = id;
    this.dayName = name;
    this.value = value;
    this.activate = function (day) {
        this.value = value;
    };
};
  
  // Create a Person object
  const monday = new Weekday(0, "monday", "false");
  const tuesday = new Weekday(0, "tuesday", "false");
  const wednesday = new Weekday(0, "wednesday", "false");
  const thursday = new Weekday(0, "thursday", "false");
  const friday = new Weekday(0, "friday", "false");
  const saturday = new Weekday(0, "saturday", "false");
  const sunday = new Weekday(0, "sunday", "false");

let dayStateArray = daySelectionState.constructor;

function daySelect () {
    var choicesContainer = document.getElementById("daySelector");

    daySelectionState.forEach(param => {
        console.log(param);
    
        var paramName = param.name;
        var paramValue = param.value;
        var paramId = param.id;
        var dayBtnContainer = document.createElement("button");
        // dayBtnContainer.innerHTML = `
        //     <button name="dayBtn" id="`+paramName+`" value="false" class="daySelectorBtnInactive" onClick=daySelectChange("`+paramName+`")>`+paramName+`</button>
        // `;
        dayBtnContainer.name = "dayBtn";
        dayBtnContainer.id = paramName;
        dayBtnContainer.value= paramValue; 
        dayBtnContainer.className= "daySelectorBtn"+paramValue;
        dayBtnContainer.onclick= function() {daySelectChange(paramName, paramId)};
        dayBtnContainer.innerHTML= paramName;
        choicesContainer.appendChild(dayBtnContainer);

        console.log(dayBtnContainer);

        var test = document.getElementsByTagName("button");
        console.log(test);

    });

    var daySelectionContainer = document.getElementById("daySelectionContainer");
    var daySubmitBtn = document.createElement("div");
    daySubmitBtn.innerHTML = `
            <button name="daySubmit" id="daySubmit" class="daySelectorSubmitBtn" onClick=daySelectSubmit()>Submit</button>
    `;
    daySubmitBtn.className= "daySelectorSubmitBtnContainer";
    daySelectionContainer.appendChild(daySubmitBtn);

    console.log(daySelectionState);
}

function daySelectChange (activeName, activeId) {
    var getDayStates = daySelectionState[activeName];
    var activeDayObject = daySelectionState[activeId];
    var activeDayValue = activeDayObject.value;
    var getElements = document.getElementsByTagName("button");
    // var test1 = getElements.includes("activeName");

    console.log("successs");
    console.log(activeName);
    console.log(activeId);
    console.log(daySelectionState);
    console.log(getDayStates);
    console.log(activeDayObject);
    console.log(activeDayValue);
    console.log(getElements);
    // console.log(test1);


    if(activeDayValue === "active"){
        activeDayObject.className = "daySelectorBtninactive";
        activeDayObject.value = "inactive";
        console.log("set value inactive");
    } if(activeDayValue === "inactive"){
        activeDayObject.value = "active";
        activeDayObject.className = "daySelectorBtnactive";
        console.log("set value active");
    }
}

function daySelectSubmit () {
    console.log("submit Successful");

    const selectedDaysArray = [];
    const daySubmitElementContainer = document.getElementById("daySelector").children;
    const daySubmitElement = daySubmitElementContainer.children;

    selectedDaysArray.push(daySubmitElement);

    console.log(daySubmitElement);
    console.log(daySubmitElementContainer.value);
    console.log(daySubmitElementContainer);
    console.log(selectedDaysArray);
    console.log(daySubmitElementContainer);

    daySubmitElement.forEach(option => {
        console.log(option.value);
    });
}

daySelect();