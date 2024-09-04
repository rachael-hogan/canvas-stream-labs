export const mouseUp = (images, setDragging, canvasRef) => {
    setDragging(null);
    // Redraw images without the border after dragging stops
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.forEach(({ img, x, y }) => {
        ctx.drawImage(img, x, y);
    });
};

export const mouseMove = (images, dragging, setImages, canvasRef, e) => {
    if (dragging !== null) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const updatedImages = [...images];
        const img = updatedImages[dragging.index].img;
        let newX = mouseX - dragging.offsetX;
        let newY = mouseY - dragging.offsetY;

        // Constrain the image within the canvas boundaries
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + img.width > canvas.width) newX = canvas.width - img.width;
        if (newY + img.height > canvas.height) newY = canvas.height - img.height;

        updatedImages[dragging.index] = {
            ...updatedImages[dragging.index],
            x: newX,
            y: newY,
        };

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw all images
        updatedImages.forEach(({ img, x, y }) => {
            ctx.drawImage(img, x, y);
        });

        // Draw the green border around the actively dragged image
        ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
        ctx.strokeRect(newX, newY, img.width, img.height);

        setImages(updatedImages);
    }
};

export const mouseDown = (images, setDragging, canvasRef, e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const imageIndex = images.findIndex(({ img, x, y }) =>
        mouseX >= x && mouseX <= x + img.width &&
        mouseY >= y && mouseY <= y + img.height
    );

    if (imageIndex >= 0) {
        setDragging({
            index: imageIndex,
            offsetX: mouseX - images[imageIndex].x,
            offsetY: mouseY - images[imageIndex].y,
        });
    }
}