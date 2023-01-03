## FORM - Refactor
<!--* we need a different approacj wheere i like have the same form stay in the middle of the screen for inputs/btn clicks, and then a seperate component that renders the cards on the side of the screen aka buildin9g the tree -->
the formm should be serpate from the dispolayy bc the form is the input and the display is the output
- so a reusable form should be presnt on screen.
- and then the display should be on the side of the screen and be a seperate component as it builds the tree
- sop one form for movie inputs since that runs once for a display to render and then one for actor selection... 
- so eadch can just use context to do things (each as in form and display)
<!-- ! make it so the form is always on the botoom and the display tree is built up top -->
I could just use:
```jsx
<div style={{ display: actorA && actorB ? 'block' : 'none' }} />
``` 
instead of refs 

- dpmt worry about organizing and modularizing and stuff to all the files... get something like in and then work on optomizing and cleanign up and stuff




<!-- ! no display -->


## Round 1
    - only logic and functionality, do not worry about any styling or anything
    - just simple texts cards/boxes to get the main idea across...super simple
    - get all the first round LOGIC first... then can sit back and look at it and decide a style/layout
    - lets also not do any data fetching and just hardcode sample data for now
    - literally yes dont do any fetching.. and make it work regardless of the structure of the data youll eventuall be using bc that is what curt saisd is so important like have the structure not matter for the code im writing so its more reusabel and flexible and effiicient
    <!-- TODO: eventually make my own relational database of movies and actors SO THAT i can grab from there for logic ... YEAAA DUUUU dude like build an api... like db and data and shtuff... idk-->
    - yea bc really use the database... no third party apir... the database like how we do it in project falcon bc like that is fasssst and good for me to liearn




## The Game
    at a point when its time to start working on the logic that actuallydetermines the outthrough of the game.
    - that logic will be a part of the api i am building for this project

    <!-- ? fine comb will be later on.. right now swtarting bringing in "data" -->
    <!--  * my api is the logic that builds this gaame.. the db actuyally can come from anywhere dug bc why reinvent the wheel.. its waht i am doing with that exact correallated data.. thats the power of my api that i am builindg... that logicn that builds Bridges -->
    <!-- ! OK. so -->
    <!-- * during this round ,... again no 3rd ;aprty... suring this round jkust make a SAMPLE db like that isnt everysingl;e movie nthe workd but just some so that we can build thiussss the logic of the game! and then after the game logic... then go back and add to the db more by conecting to the omdb thing? or add more calls a day if needed or build a gql thing?. -->
        <!-- * using my subscribed to omdb... make a submset -->