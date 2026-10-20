# Lab 4 Notes

## 1. title (prop) vs done (state)

title is a prop, so it comes from the parent (App) and TaskCard can only read it. done is state now, the done prop only gives the starting value and after that TaskCard keeps it with useState and changes it with setDone when the checkbox is clicked. TaskCard can't change title bcs it belongs to the parent, but done belongs to TaskCard so it can change it.
