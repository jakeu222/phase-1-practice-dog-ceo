console.log('%c HI', 'color: firebrick')



loadImages();

loadBreedOptions();
// need to call the functions to make sure all that work doesnt got to  waste


function loadImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(res => res.json())
        .then(results => {
            // convert to image url to json 
            results.message.forEach(image => addImage(image))
            //for each image in the JSON in the "message" catagory i want to call the add image function to display to the DOM
        });
}
//dogpicurl is what we want to output when we input the addimage function
function addImage(dogPicUrl) {
    const container = document.querySelector('#dog-image-container');
    // selects the dog image container,
    const newImageEl = document.createElement('img');
    // creates new image element
    container.append(newImageEl);
    // attaches the new image element tot the dog image container
    newImageEl.src = dogPicUrl;
    // attaches source url to the image and assigns it to the dogpicurl variable 


    // this function now has a dog picture ready to go when ever called upon




}



function loadBreedOptions() {
    //this is a function to find breeds 
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        // convert array of dog breeds in the form of objects
        .then(results => {

            breeds = Object.keys(results.message);
            //creating an array of dog breeds from the keys in message object from the JSON file using the object.keys() method 
            updateBreedList(breeds);
            //creates an updated array of dog breeds 
            addBreedSelectListener();
            // 
        });
}
let breeds = [];
// this acts as a container to store the array created above, needs to be outside of the function to work like as intended


//the add breed function 
function addBreed(breed) {
    const ul = document.querySelector('#dog-breeds');
    const li = document.createElement('li');
    //selects the dog-breeds id from the HTML and creates a list item element 
    ul.append(li);
    // adds the new list item to the unordered list called dog-breeds
    li.textContent = breed;
    //assigns the text content of the list item to the "breed" array
    li.style.cursor = 'pointer';
    //uses dot notation to manipulate the css and change the curser to when hovering over the list items
    li.addEventListener('click', updateColor);
    // this creates an event that when the list item is clicked it runs the function uppdate color
}


function updateColor(event) {
    // creates a function to update the color when the click event occurs
    event.target.style.color = 'red';
    // grabs li and changes the color to red when called 
    // event.target means the element the event listener is attached to. 
    //it can be read as li.style.color = "red"
    // the reason you cant use li.style.color = "red" is because the li only exist in the function above or is not global 
}

function updateBreedList(breeds) {
    //this function takes the array breeds as it's parameter to update 
    const ul = document.querySelector('#dog-breeds');
    // the variable ul selects the id dog-breeds via the queryselector method 
    removeChildren(ul);
    // calls the function removechildren and applys the function to the ul element 
    breeds.forEach(breed => addBreed(breed));
    // for each breed name in the the add breed function from eariler is called 

}




function removeChildren(element) {
    // a function that removes the last child element of a html data type in this case dog breeds
    let child = element.lastElementChild;
    // grabs the last element of the child and assigns it to a variable 
    while (child) {
        //as long as the child variable is true the loop will continue
        element.removeChild(child);
        // this line removes the child element from the parent which is the ul 
        child = element.lastElementChild;
        // this line moves to the next child element within the ul
    }
    // the elements are removed from the ul and the loop stops
}

// this is a function to add an event listener to the add breed function
function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    // selects the breed-dropdown id from the html and assigns it the breed dropdown variable name
    breedDropdown.addEventListener('change', (event) => {
        // this change event listener is implemented when the user selects a different option in the dropdown display
        selectBreedsStartingWith(event.target.value);
        //runs the selectBreedsStartingWith() function with the value, or users selection, and is used for filtering throught the element
    });
}








// funtion will select the breed based on the starting (letter)
function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
    // the breeds array is filtered, for each breed in the breeds array it checks what letter the breed stars with and either includes it in the for loop or excludes it based on weather the breed name meets the criteria 
}















// Challenge 1
// This repository includes an index.html file that loads an index.js file.

// const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
// Add JavaScript that:

// on page load, fetches the images using the url above ⬆️
// parses the response as JSON
// adds image elements to the DOM for each 🤔 image in the array
// Hint: Recall that you will need to ensure that your JavaScript doesn't run until after the HTML has loaded. You can use whichever method you prefer to accomplish this.

// Challenge 2
// const breedUrl = "https://dog.ceo/api/breeds/list/all";
// After the first challenge is completed, add JavaScript that:

// on page load, fetches all the dog breeds using the url above ⬆️
// adds the breeds to the page in the <ul> provided in index.html
// Challenge 3
// Once all of the breeds are rendered in the <ul>, add JavaScript so that, when the user clicks on any one of the <li>s, the font color of that <li> changes. This can be a color of your choosing.

// Challenge 4
// Once we are able to load all of the dog breeds onto the page, add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown.

// For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a. For simplicity, the dropdown only includes the letters a-d. However, we can imagine expanding this to include the entire alphabet.

