
function publishMessage()
{
    author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const errorMessageDiv = document.getElementById('error-message');

    console.log("gehh")
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
    const messageObject = {author, message, timestamp}
    //setCookie(author, message, timestamp);
    //getCookies();

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

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = messageObject.message;

    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.innerText = messageObject.timestamp;

    //------------------------------------------
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'read-checkbox';
    checkbox.addEventListener('change', toggleCheckbox);

    const checkboxText = document.createElement('lable');
    checkboxText.innerText = 'Har läst';
    checkboxText.insertBefore(checkbox, checkboxText.firstChild);

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
    
    if (event.taget.checked)
    {
        card.classList.add('read');
    }else
    {
        card.classList.remove('read');
    }

}

function clearFields() 
{
    document.getElementById('author').value = '';
    document.getElementById('message').value = '';
}

// function setCookie(author, message, time) {
//     if getCookie
//     console.log("asdlkföjasdölf");
//     const d = new Date();
//     d.setTime(d.getTime() + (24*60*60*1000));
//     let expires = "expires=" + d.toUTCString();
//     const payload = [author, message, time];
//     document.cookie = time + "=" + payload + ";" + expires + ";path=/";
// }

// function getCookies() {
//     cookies = document.cookie.split(";")
//     console.log(cookies)

//     console.log("hej")
// }

// hej;jag;heter;oskar