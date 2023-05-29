const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

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

function daySelectSubmit () {
    console.log("submit Successful");

    const selectedDaysArray = [];
    const daySubmitElementContainer = document.getElementById("daySelector").children;
    const daySubmitElement = daySubmitElementContainer.children;

    selectedDaysArray.push(daySubmitElement);

    console.log(daySubmitElement);
    console.log(daySubmitElementContainer);
    console.log(daySubmitElementContainer);
    console.log(selectedDaysArray);
    console.log(daySubmitElementContainer);

    daySubmitElement.forEach(option => {
        console.log(option.value);
    });
}

daySelect();