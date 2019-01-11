# Bingo

## Introduction

It is a program that simulates a bingo game. It is developed in javascript.

## Functional description

This project is designed to be executed in a console. You can use the Chrome browser console by copying and pasting the code.

The program first shows numbers in the console that represent a bingo card. Then generate randomly numbers, if the numbers match any of the numbers on the card, these will be crossed out with an "X". The process is repeated until all the numbers on the bingo card are finished.

## Instructions

When the program starts, you have to enter your name in the message that appears. Then you have to press the "accept" button to continue the game. Each new ball will display a message of the "alert" type asking if you want a new ball.

## Tecnical description

The function
```javascript
nextTurn()
``` 
is the most important because it calls other functions such as 
```javascript
generaterandom()
checkLine()
``` 
to comply with the instructions of the game.

The function
```javascript
screen()
```
includes everything that will be displayed on the console. 