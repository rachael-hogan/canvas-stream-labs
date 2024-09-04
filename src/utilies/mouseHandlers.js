export const mouseUp = (images, setDragging, canvasRef) => {
    setDragging(null);
    // Remove green border when dragging stops
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.forEach(({ img, x, y }) => {
        ctx.drawImage(img, x, y);
    });
};

export const mouseMove = (images, dragging, setImages, canvasRef, e) => {
    if (dragging !== null) {
        // Find the canvas area and the mouse position
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        //Grab the image being dragged and set its new position
        const updatedImages = [...images];
        const img = updatedImages[dragging.index].img;
        let newX = mouseX - dragging.offsetX;
        let newY = mouseY - dragging.offsetY;

        // Don't allow images to leave canvas area
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + img.width > canvas.width) newX = canvas.width - img.width;
        if (newY + img.height > canvas.height) newY = canvas.height - img.height;

        //Set where the image should be drawn
        updatedImages[dragging.index] = {
            ...updatedImages[dragging.index],
            x: newX,
            y: newY,
        };

        //clear the images before redrawing them
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw all images
        updatedImages.forEach(({ img, x, y }) => {
            ctx.drawImage(img, x, y);
        });

        // Add a green bord to images being dragged
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.strokeRect(newX, newY, img.width, img.height);

        setImages(updatedImages);
    }
};

export const mouseDown = (images, setDragging, canvasRef, e) => {
    // Find the canvas area and the mouse position
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    //Find which image the mouse is on
    const imageIndex = images.findIndex(({ img, x, y }) =>
        mouseX >= x && mouseX <= x + img.width &&
        mouseY >= y && mouseY <= y + img.height
    );

    //Set that image to being dragged
    if (imageIndex >= 0) {
        setDragging({
            index: imageIndex,
            offsetX: mouseX - images[imageIndex].x,
            offsetY: mouseY - images[imageIndex].y,
        });
    }
}