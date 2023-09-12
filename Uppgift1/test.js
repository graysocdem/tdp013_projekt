
function publishMessage()
{
    author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const errorMessageDiv = document.getElementById('error-message');
    const read = false;

    if (author.length == 0)
    {
        console.log("hej")
        author = "John Doe"
    }

    if (message.length == 0 || message.length > 140) 
    {
        
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.innerText = 'Meddelandet måste vara mellan 1 och 140 tecken långt.';
        return;
    }
     else {
        errorMessageDiv.style.display = 'none';
    }

    const timestamp = new Date().toLocaleString();
    console.log(timestamp, "timestamp")
    const messageObject = {author, message, timestamp, read}
    setCookie(author, message, timestamp, read);
    clearFields();
    showMessage(messageObject);
}

function showMessage(messageObject)
{
    const container = document.querySelector('.container');

    const card  = document.createElement('div');
    card.className = 'card';
    card.author = messageObject.author
    card.message = messageObject.message
    card.timestamp = messageObject.timestamp
    card.read = messageObject.read

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    cardHeader.innerText = card.author;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

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


    if (card.read == "true") {
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

    container.prepend(card); //ÄNDRAD RAD, appendChild() -> prepend(). Lägger nyaste inlägg först genom att lägga den "först i child-listan".

}

function toggleCheckbox(event)
{
    const card = event.target.closest('.card');
    
    if (event.target.checked)
    {
        card.read = "true"
        console.log(new Date(card.timestamp).toLocaleString(), "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        setCookie(card.author, card.message, new Date(card.timestamp).toLocaleString(), true)
        console.log(document.cookie, "sanna cookies!!!!")
    }   
    else
    {
        card.read = "false"
        setCookie(card.author, card.message, card.timestamp.toLocaleString(), false)
        console.log(document.cookie, "falska cookies!!!!")

    }
}

function clearFields() 
{
    document.getElementById('author').value = '';
    document.getElementById('message').value = '';
}

function setCookie(author, message, time, read) {

    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires=" + d.toUTCString();

    console.log(time, "alsökjfölasdkjf")

    payload = encodeURIComponent(author) + ',' + encodeURIComponent(message) + ',' + encodeURIComponent(read);
    document.cookie = encodeURIComponent(time) + "=" + payload + ";" + expires + ";path=/";
}

function getCookies() {

    cookies = document.cookie
    encodedCookieList = cookies.split(";")
    
    posts = {}

    for (i = 0; i <= encodedCookieList.length-1; i++) {
        current = encodedCookieList[i];

        templist = current.split("=");
        timestamp = decodeURIComponent(templist[0])

        //pga konstigt mellanslag som dyker upp i början på alla utom 1a timestampen
        if (timestamp[0] == " ") {
            timestamp = timestamp.substring(1) 
        }

        payload = templist[1].split(',')

        for (let i in payload) {
            payload[i] = decodeURIComponent(payload[i]) 
        }
        posts[timestamp] = payload

    }

    return posts

}

function publishCookies(posts) {
    console.log(posts)

    console.log("unsorted", posts)

    
    posts = Object.keys(posts).sort().reduce(function(accumulator, key) {
            console.log(key)
            accumulator[key] = posts[key]
            return accumulator
        }, {})

    console.log("sorted", posts)

    for (let timestamp in posts) {
        payload = posts[timestamp]

        author = payload[0]
        message = payload[1]
        read = payload[2]
        messageObject = {author, message, timestamp, read}

        showMessage(messageObject)
    }
}