import React, { useEffect, useRef, useState } from "react";
import {mouseDown, mouseMove, mouseUp} from "../utilies/mouseHandlers";

const CanvasTutorial = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [dragging, setDragging] = useState(null);

    // Load images and set up the canvas
    useEffect(() => {
        const loadImages = () => {
            return Promise.all(
                ["/Bebo.jpeg", "/kevin.jpg"].map((src) => {
                    const img = new Image();
                    img.src = src;
                    return new Promise((resolve) => {
                        img.onload = () => resolve({ img, x: 0, y: 0 });
                    });
                })
            );
        };

        const draw = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            images.forEach(({ img, x, y }) => {
                ctx.drawImage(img, x, y);
            });
        };

        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            // Set the canvas dimensions to match the window
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            //Dimensions must remain in a 16:9 ratio
            const width = windowWidth;
            const height = (width * 9) / 16;

            if (height > windowHeight) {
                canvas.height = windowHeight;
                canvas.width = (windowHeight * 16) / 9;
            } else {
                canvas.width = width;
                canvas.height = height;
            }
            draw();
        };

        loadImages().then((loadedImages) => {
            // Only set the images if they haven't been set yet
            if (images.length === 0) {
                setImages(loadedImages);
                resizeCanvas();
            }
        });
        draw();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    });

    useEffect(() => {
        const handleMouseDown = (e) => {
            mouseDown(images, setDragging, canvasRef, e);
        };

        const handleMouseMove = (e) => {
            mouseMove(images, dragging, setImages, canvasRef, e);
        };

        const handleMouseUp = (e) => {
            mouseUp(images, setDragging, canvasRef, e);
        }

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, images]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{position: 'fixed', border: '1px solid black'}}
            />
        </div>
    );
};

export default CanvasTutorial;
