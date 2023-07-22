const addCircle= document.querySelector('.circle-plus');
console.log(addCircle);

// Add-Circle will have an event listener for 'click'
addCircle.addEventListener('click',(event)=>{
    event.stopPropagation();
    console.log("Clicked addCircle")
    removeBoxes(); //works
    addPrompt();
});

// Remove other dialog boxes
const removeBoxes = ()=>{
    const updateBox = document.querySelector('.update-box');
    const addBox = document.querySelector('.add-box');
    if (updateBox){updateBox.parentNode.removeChild(updateBox)};
    if (addBox){addBox.parentNode.removeChild(addBox)};
    
};

// Create the add dialog box
const addPrompt = ()=>{
    const addContainer = document.createElement('div');
    addContainer.className=('add-box');
    addContainer.innerHTML = `
        <div class="add-title">Add Task</div>
        <input type="text" class="add-input" value="">
        <button class="add-button">Confirm</button>
    `;
    setPromptPosition(addContainer);
    const inputText = addContainer.querySelector('.add-input')
    listenToConfirm(addContainer, inputText);
    document.body.appendChild(addContainer);
    inputText.focus();
};


// Position add box above bubble
const setPromptPosition = (target) =>{
    const circleRect = addCircle.getBoundingClientRect();
    target.style.position = 'absolute';
    target.style.top = circleRect.top - target.offsetHeight -10+'px';
    target.style.left = circleRect.left + (circleRect.width - target.offsetWidth) / 2 + 'px';
};


const listenToConfirm = (parent, textBox) =>{
    const confirmButton = parent.querySelector('.add-button');
    confirmButton.addEventListener('click', function(){
        console.log("Clicked Confirm");
        createTask(textBox);
    });
};

const createTask = async (textBox)=>{
    const newTask = textBox.value.trim();
    console.log(`calling POST route for task: ${newTask}`);
    const url = `/api/task/`;
    if(!newTask) {throw new Error('Empty Task!')}
    else{
        try {
            const res = await fetch(url,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {name: newTask} ),
            });
    
            if (!res.ok){ throw new Error('Post failed!') };
            console.log("Post Successful!");
            document.location.replace('/'); //reload all tasks
        }catch(err){
            console.error(err);
        };
    };
}