Lab 5 notes

1
status starts as loading so for the first 800ms the page only shows Loading tasks... after 800ms the mock api gives the 2 tasks, status becomes success and the list shows up.

it was right, first I saw Loading tasks... and then the 2 tasks came.

2 
empty means it worked but there is no tasks. error means it failed. they need to be separate bcs otherwise the user cant know if something broke or they just dont have tasks yet.

3
if the data comes very fast the loading text shows for like 50ms and the screen just flashes, it looks like a bug. keeping it 400ms looks smoother and calmer. its a little slower but it feels better for the user.

3
I tried it without the mouse. tab went to task title and I typed test. enter adds the task right away, tab tab to add task and enter also works. shift tab goes back one box. everything worked.
