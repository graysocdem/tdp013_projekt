//Utgråning av knapp vid "har läst"-itryckning

//ha inte getcookies i html-en.
//kan sätta event listener längst upp i javascriptfil för att undvika onload och onclick (DOMContentLoaded)
//Lägg till javascriptfilen med resten av imports

async function publishMessage() {
    const author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const errorMessageDiv = document.getElementById('error-message');
    const read = false;

    if (author.length == 0) {
        author = "John Doe"
    }

    if (message.length == 0 || message.length > 140) {

        errorMessageDiv.style.display = 'block';
        errorMessageDiv.innerText = 'Meddelandet måste vara mellan 1 och 140 tecken långt.';
        return;
    }
    else {
        errorMessageDiv.style.display = 'none';
    }

    const timestamp = new Date().toLocaleString();
    const messageObject = { author, message, timestamp, read }
    savePost(author, message, timestamp, read);
    clearFields();
    showMessage(messageObject);
}

async function savePost(authorIn, messageIn, timestampIn, readIn) {
    const post = {
        author: authorIn,
        message: messageIn,
        timestamp: timestampIn,
        read: readIn
    }

    fetch("http://127.0.0.1:3000/messages", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.text())
        .then((text) => console.log(text))
}

function showMessage(messageObject) {
    const container = document.querySelector('.container');

    const card = document.createElement('div');
    card.className = 'card';

    console.log(messageObject)
    console.log("BBBBBBBBBBBBBBBB", messageObject._id)

    card._id = messageObject._id
    card.author = messageObject.author
    card.message = messageObject.message
    card.timestamp = messageObject.timestamp
    card.read = messageObject.read

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    cardHeader.innerText = card.author;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.body = cardBody

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = card.message;

    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.innerText = card.timestamp;

    //------------------------------------------
    cardCheckbox = document.createElement('input');
    cardCheckbox.type = 'checkbox';
    cardCheckbox.className = 'read-checkbox';


    if (card.read == true) {
        card.body.style.backgroundColor = "#c9c5c5";
        cardCheckbox.checked = true
    }
    else {
        cardCheckbox.checked = false
    }

    cardCheckbox.addEventListener('change', toggleCheckbox);
    card.checkbox = cardCheckbox

    const checkboxText = document.createElement('label');
    checkboxText.innerText = ' Har läst';
    checkboxText.insertBefore(cardCheckbox, checkboxText.firstChild);

    cardHeader.appendChild(checkboxText);
    //------------------------------------------

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    container.prepend(card);
}

async function toggleCheckbox(event) {
    
    const card = event.target.closest('.card');
    console.log(card)

    const _id = card._id;

    if (event.target.checked) {
        card.body.style.backgroundColor = "#c9c5c5";
        card.read = "true"
    }
    else {
        card.body.style.backgroundColor = "white";
        card.read = "false"
    }


    fetch(`http://127.0.0.1:3000/messages/${_id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.text())
      .then((text) => console.log(text))

}

function clearFields() {
    document.getElementById('author').value = '';
    document.getElementById('message').value = '';
}

function setCookie(author, message, time, read) {

    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    const payload = encodeURIComponent(author) + ',' + encodeURIComponent(message) + ',' + encodeURIComponent(read);
    document.cookie = encodeURIComponent(time) + "=" + payload + ";" + expires + ";path=/";
}

function ajaxFunction() {
    getPosts()
    setInterval(getPosts, 5000)
}

async function getPosts() {
    const response = await fetch("http://127.0.0.1:3000/messages")
    const posts = await response.json()
    for (i in posts) {
        console.log(posts[i])
        showMessage(posts[i])
    }
}

/*function getCookies() {

    const cookies = document.cookie
    const encodedCookieList = cookies.split(";")
    
    let posts = {}
    for (i = 0; i <= encodedCookieList.length-1; i++) {
        let current = encodedCookieList[i];
        const templist = current.split("=");
        let timestamp = decodeURIComponent(templist[0])

        //pga konstigt mellanslag som dyker upp i början på alla utom 1a timestampen
        if (timestamp[0] == " ") {
            timestamp = timestamp.substring(1)
        }

        let payload = templist[1].split(',')        
        for (let i in payload) {
            payload[i] = decodeURIComponent(payload[i]) 
        }
        posts[timestamp] = payload
    }

    return posts

}*/

/*function publishCookies(posts) {

    posts = Object.keys(posts).sort().reduce(function(accumulator, key) {
            accumulator[key] = posts[key]
            return accumulator
        }, {})

    for (let timestamp in posts) {
        const payload = posts[timestamp]

        const author = payload[0]
        const message = payload[1]
        const read = payload[2]
        const messageObject = {author, message, timestamp, read}

        showMessage(messageObject)
    }
}*/