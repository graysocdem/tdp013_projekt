




function publishMessage()
{
    author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const errorMessageDiv = document.getElementById('error-message');


    console.log("gehh")
    if (author.length == 0)
    {
        console.log("hej")
        author = "Jon Doe"
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
    

    const button = document.createElement('button')
    readButton.innerText = 'Mark as Read';
    readButton.className = 'btn btn-secondary';
    readButton.addEventListener('click', seenTweet);

    
    cardHeader.appendChild(readButton);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    container.appendChild(card);
}

function seenTweet(event)
{
    const card = event.target.closest('.card');
    card.style.backgroundColor = 'lightgreen';
}


function clearFields() 
{
    document.getElementById('author').value = '';
    document.getElementById('message').value = '';
}