# Connect Four Game

## Introduction

This document provides an overview of the implementation of a simple turn-based Connect four game. The application is built using JavaScript and React and written in Node.js using the server-side component Express. The game includes features such as the game creation screen, the game list screen and the actual game screen. In addition, the application utilises a basic AI component for the computer player using OpenAI's GPT (Generative Pre-Trained Transformer).

## Project Overview
There are four separate pages in the repository:

CreateGameScreen : Game creation screen where users can choose their username, game name and game colour.

GameListScreen : A screen that displays the score list of previously created games.

GameScreen : The main screen where the game is played.

Server.js : The backend section I created for my react project to communicate with Openai.


# Project Objectives

This game project aims not only to offer a fun Connect Four game, but also to provide a user-friendly experience by effectively utilising modern technologies. The main goals of the project are as follows:

Artificial Intelligence Integration: The game is based on artificial intelligence algorithms and offers users a gaming experience where they can compete with real intelligence.

React.js Usage: The user interface, game board and other components are created using React.js. This provides a dynamic and interactive gaming experience.

Artificial Intelligence Assistant with Node.js: Node.js is used in the development of the artificial intelligence assistant. The assistant aims to guide the players. However, the connection part is not yet completed.


# API Part

To run the application, you need to replace YOUR_API_KEY part with your key and YOUR_ASSISTANT_KEY part with your assistant key. For the assistant, use the description below:

- OPENAI_API_KEY=Your_api_key

- ASSISTANT_ID=Your_assistant_id

Assistant Description: We're gonna play Connect Four. Here's how we'll do it: My Turn: Start the game. I will send you an array with 'PLAYER' placed instead of 'EMPTY' in your chosen column. Remember, I can only put 'PLAYER' above 'EMPTY' if there's no empty space below in that column. My Turn (AI): After I make my move, you will take your turn. you'll put 'AI' in one of the 'EMPTY' spots, following the same rules. Game Board: Our board is a 2D array. We fill it from bottom to top, just like in the real Connect Four game. Winning the Game: Keep an eye out for four in a row – horizontally, vertically, or diagonally. You check for the win after each move. Invalid Moves: If you try to put 'PLAYER' in a full column or float it in the air, I won't make a move. Just correct it and send again. Continuing the Game: After each turn, send me the updated board. We'll keep going back and forth like this. My Responses: I'll only send back the array with my move. No extra text, just the game board. 



# Uncompleted Parts

Sometimes the assistant does not work well and switches X and Y. At these times, the win/lose functions may be impaired. This is the most accurate version I can make after trying the movements of the assistant.

# Game Features and Details

- GameCreationScreen

The project includes an aesthetic entrance screen that welcomes users. The font style, colour palettes and sizes have been carefully selected to provide a pleasant welcome to users.

- Game Options and List
  
The game consists of different colours of game board, tile colour and game background colour options. Users can make their preferences in the game list and view information such as the name of the game, player name, selected board colour.

- Colourful Gaming Experience

In the third part of the game, the colours selected by the user are used on the playing field. This feature not only personalises the game but also provides a visually rich experience.

- Results and Replay
  
When the game is over, in case of a tie, the game is repeated. If one of the sides wins, a page opens on the screen where they can make their choices and repeat the game or switch to the scoreboard if they wish. Players can exit the game at any time by using the "Exit" button.

## *Getting Started*

1. Clone the repository:
2. bash
3. Code copying

## Go to the project directory:


- [gh repo clone doganabdussamed/connectfour](https://github.com/doganabdussamed/connectfour) 


- Clone the repository.

- Install dependencies using npm install in both the root directory and the src directory.

 (npm install)

- Start the server using node connectfour/backend-part/Connect_Four_Backhand/server.js.

(node server.js) 

- Run the React app using npm start in the root directory.

(npm start)

- Access the application in a web browser.


-  Open your browser and go to http://localhost:3000 to view the application.





# Bonus Features

- Artificial Intelligence Development:

- Computer games incorporate artificial intelligence (OpenAI) for enhanced gameplay.

- Animations and colour transitions:

# Version Control

- This project uses Git for version control.

- Each development step is committed to the project repository.

# Contributing

- We look forward to your contributions! Feel free to send problems or pull requests.

# Links to some of the sections where I got help from artificial intelligence

- https://chat.openai.com/share/b3e4ea5e-947a-431c-b24a-c7502f34e3ec

- https://chat.openai.com/share/f8d326a0-7d2b-480d-872f-f8b0298a2e4b

- https://chat.openai.com/share/5fd9abb0-793f-4bd7-aa90-d9b0e20f8772

- https://chat.openai.com/share/f096f0c5-9e7f-4e77-b232-3795eaac6044

- https://chat.openai.com/share/054fa719-973f-4459-9c2f-49b15763cb28

- https://chat.openai.com/share/e50d684d-814d-461e-9659-6e605d00ab44

- https://chat.openai.com/share/235e50e2-7373-4ac4-9e80-fe48c28b344b

- https://chat.openai.com/share/f0c80662-201e-4b0a-9de8-3b1eec4b7999

- https://chat.openai.com/share/8cf9f034-c1bd-41ac-8ed0-c59b7b66c5b2










