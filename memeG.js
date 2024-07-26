document.getElementById('memeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    if (imageFile) {
        // Read uploaded image as Data URL
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            // Generate meme and add to page
            addMeme(imageUrl, topText, bottomText);

            // Clear form fields
            document.getElementById('topText').value = '';
            document.getElementById('bottomText').value = '';
            document.getElementById('imageUpload').value = '';
        };
    }
});

function addMeme(imageUrl, topText, bottomText) {
    // Create meme container
    const memeContainer = document.createElement('div');
    memeContainer.classList.add('meme');

    // Create image element
    const memeImage = document.createElement('img');
    memeImage.src = generateMeme(imageUrl, topText, bottomText);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        memeContainer.remove();
    });

    // Append elements to meme container
    memeContainer.appendChild(memeImage);
    memeContainer.appendChild(deleteButton);

    // Append meme container to meme list
    const memeList = document.getElementById('memeList');
    memeList.appendChild(memeContainer);
}

function generateMeme(imageUrl, topText, bottomText) {
    // Placeholder URL for demonstration
    // In real-world scenario, this would involve more complex image processing
    const encodedTopText = encodeURIComponent(topText);
    const encodedBottomText = encodeURIComponent(bottomText);
    return `${imageUrl}?top=${encodedTopText}&bottom=${encodedBottomText}`;
}