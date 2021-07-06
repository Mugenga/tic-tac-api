// controller.js
const task = {};
var TicTac = require("./TicTac");

var ticTac = new TicTac();

exports.game = (req, res) => {
  // Get the board from the query
  const board = req.query.board;
  // Check if query is empty
  if (board.length === 0) {
    res.status(400);
    res.json("enter the board please");
  }

  if (board.length < 9) {
    res.status(400);
    res.send("board incomplete");
  }

  if (ticTac.is_valid(board) === false) {
    res.status(400);
    res.send(
      "Board contains invalid characters or Player o not allowed to nake a move"
    );
  }

  if (ticTac.is_game_tie(board) === true) {
    res.status(400);
    res.send(board);
  }

  // Check if player won
  if (ticTac.is_player_winner(board, "x")) {
    res.json(board);
  }

  // Check if player won
  if (ticTac.is_player_winner(board, "o")) {
    res.send(board);
  }

  // Figuring out the next player
  var next_player;
  if (board.split("o").length - 1 - (board.split("x").length - 1) == 1) {
    next_player = "x";
  }
  if (
    board.split("x").length - 1 - (board.split("o").length - 1) == 1 ||
    board.split("x").length - 1 - (board.split("o").length - 1) == 0
  ) {
    next_player = "o";
  }

  // if next player is computer (o)
  let curr_move;
  console.log("computer move start");
  console.log("-------------------");
  console.log("Board Before: " + board);
  if (next_player == "o") {
    // Get Move
    curr_move = ticTac.get_move(board, "o");
    let newBoard = board.split("");

    newBoard[curr_move] = "o";

    console.log("Move index " + curr_move);
    console.log("Board After: " + newBoard);

    const next_board = newBoard.join("");
    res.send(next_board);
  }

  // If next player is human (x)
  if (next_player == "x") {
    const prospective_board = ticTac.get_prospective_board(board, next_player);
    res.send(prospective_board);
  }
};
