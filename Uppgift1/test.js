
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

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerText = messageObject.author;
    card.header = cardHeader

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.body = cardBody

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = messageObject.message;
    cardBody.text = cardText

    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.innerText = messageObject.timestamp;
    card.footer = cardFooter

    //------------------------------------------
    const cardCheckbox = document.createElement('input');
    cardCheckbox.type = 'checkbox';
    cardCheckbox.className = 'read-checkbox';
    cardCheckbox.addEventListener('change', toggleCheckbox);
    card.checkbox = cardCheckbox

    const checkboxText = document.createElement('lable');
    checkboxText.innerText = 'Har läst';
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
    
    posts = getCookies()
    if (event.target.checked)
    {
        card.classList.add('read');
        setCookie(card.author, card.message, card.footer.innerText,)
        posts[card.footer.innerText][2] = true
    }   
    else
    {
        card.classList.remove('read');
        posts[card.footer.innerText][2] = false
    }

    document.getCookie

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
    
    for (let timestamp in posts) {
        payload = posts[timestamp]

        author = payload[0]
        message = payload[1]
        read = payload[2]
        messageObject = {author, message, timestamp, read}

        console.log("messageObject", messageObject)
        showMessage(messageObject)
    }
}