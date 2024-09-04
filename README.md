# Canvas Stream Labs
This project uses the Canvas API to build a very basic simplified version of the editor found in the Streamlabs Desktop App.
The Canvas should render two images that the user can drag around.

## To Run
1. Clone the repository
2. Run `npm install`
3. Run `npm start` -
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.


## Follow Up   

### 1. How long did it take you to complete this assignment?
It took me about 5 hours to complete this assignment.
### 2. What about this assignment did you find most challenging?
The most challenging part of this assignment was to implement the drag and drop functionality. I don't have a lot of experience with positioning logic
and movement. I did have to use AI tools quite a bit in order to get the drag and drop functionality working as I couldn't find
much documentation on how to achieve that, and I lacked experience in that area.

A fun problem that I ran into was getting the images to "stick" after they were dragged. For a while, 
they kept reverting back to the original x:0 y:0 positions. I realized two things. 1. I was redrawing the images in handleMouseMove immediately after saving
state, which wasn't giving state enough time to update. I had to move the draw functionality into useEffect, so that it would only be called once the images
updated.(This ended up being taken out at the end because I just moved the draw logic into the mouseMove function, so I could obtain the green border.) 2.
Occasionally, it seemed like images kept getting reloaded. I had to add a condition to check if the images were already loaded before setting the state on load again.

### 3. What about this assignment did you find unclear?
I felt like the assignment itself was clear and straightforward. 

The only thing that I felt was unclear was the Canvas API documentation on implementing the drag and drop functionality. 
I couldn't seem to find anything in the Canvas API that really matched this requirement, which made it difficult for me to implement.
### 4. Do you feel like this assignment has an appropriate level of difficulty?
This assigment was definitely out of my comfort zone. As mentioned, I haven't worked with image/drawing positioning much
Most of my front end experience exists at a higher level implementing UI components and using libraries. This assignment required me to work at a lower level
than I am used to.

That being said, I think it was a good challenge, and I definitely learned a lot from it. While I may have found this slightly difficult,
I did walk away with a pretty good understanding of new concepts and tools that I can use in the future.
### 5. Briefly explain the technical decisions you made in this project, i.e. architecture, code-splitting, libraries, or other decisions and tradeoffs.
1. I used React for this project because my most recent experience was with React, and I felt most comfortable with it. After completing this project,
I realized that this project was truly language agnostic, and I probably could have used vanilla JS to complete it.
2. My biggest code-splitting decision was to move the mouseHandlers into their own file. It was quite a bit of code,
and I felt it made it hard to understand the main Canvas component with all of that code in there. I believe for future
additions to this project, it will be easier to debug if the mouseHandlers were in their own file.
3. One thing that I could not figure out was keeping the images within the canvas dimensions on resize. For example: If you have the canvas on full width,
then resize the window to be smaller, the images will be outside of the canvas. I tried to implement this, but I couldn't figure it out.
4. As mentioned, I did choose to use AI tools like ChatGPT. I used this to help me understand how to implement the drag and drop functionality.