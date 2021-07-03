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
    res.json({error: "Board contains invalid characters or Player o not allowed to nake a smove"})
  }
  
  if(ticTac.is_game_tie(board) === true){
    res.status(400);
    res.json({message: "It's a tie"})
  }
  
  // Check if player won
  if(ticTac.is_player_winner(board, 'o')){
    res.json({message: "Player O won."})
  }
  else{
    res.json(board)
  }
};
