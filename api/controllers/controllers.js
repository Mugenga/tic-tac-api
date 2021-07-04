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
    res.json({ error: "enter the board please" });
  }

  if (board.length < 9) {
    res.status(400);
    res.json({ error: "board incomplete" });
  }

  if (ticTac.is_valid(board) === false) {
    res.status(400);
    res.json({
      error:
        "Board contains invalid characters or Player o not allowed to nake a smove",
    });
  }

  if (ticTac.is_game_tie(board) === true) {
    res.status(400);
    res.json({ message: "It's a tie" });
  }

  // Check if player won
  if (ticTac.is_player_winner(board, "o")) {
    res.json({ message: "Player O won." });
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

  // If next player is human (o)
  let curr_move;
  console.log("Board Before: " + board);
  if (next_player == "o") {
    // Get Move
    curr_move = ticTac.get_move(board, "o");
    let newBoard = board.split("");

    console.log("Move index " + curr_move);
    console.log("Board After: " + newBoard);

    const next_board = newBoard.join("");
    res.json({ next_board: next_board });
  }

  // if next player is computer (x)
  if (next_player == "x") {
    const prospective_board = ticTac.get_prospective_board(board, next_player);
    res.json({ next_board: prospective_board });
  }
};
