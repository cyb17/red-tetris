import { Game } from './game.js';
// import { moveDown, moveLeft, moveRight } from './helpers.js';

// const events = [
//   { type: 'MOVE_LEFT' },
//   { type: 'MOVE_RIGHT' },
//   { type: 'ROTATE' },
//   { type: 'DROP' },
//   { type: 'TICK' },
// ];
// console.log('-----Create fake events', events);

// const gameReducer = (state, event) => {
//   switch (event.type) {
//     case 'MOVE_LEFT':
//       console.log('test');
//       return {
//         ...state,
//         currentPosition: moveLeft(state.currentPosition),
//       };
//     case 'MOVE_RIGHT':
//       return {
//         ...state,
//         currentPosition: moveRight(state.board, state.currentPosition),
//       };
//     case 'SOFT_DROP' || 'TICK':
//       return {
//         ...state,
//         currentPosition: moveDown(state.board, state.currentPosition),
//       };
//     case 'HARD_DROP':
//       return {
//         ...state,
//         currentPosition: hardDrop(state.board, state.currentPosition),
//       };
//     case 'ROTATE':
//       return {
//         ...state,
//         currentPiece: state.currentPiece.rotate(),
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

// function startGame() {
//   const game = new Game('single');
//   console.log('-----Create a new Game: ', game);

//   let state = game.getGameInitialState();
//   while (events.length) {
//     const event = events.shift();
//     const newState = gameReducer(state, event);
//     console.log(`-----newState after ${event.type}:\n`, newState);
//     state = newState;
//   }
// }

// startGame();

function main() {}
