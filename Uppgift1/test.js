




function publishMessage()
{
    author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const errorMessageDiv = document.getElementById('error-message');

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
    document.getElementById('postdiv').innerHTML = messageObject.message;
    document.getElementById('postdiv').innerHTML = messageObject.author;
}

function clearFields() 
{
    document.getElementById('author').value = '';
    document.getElementById('message').value = '';
}