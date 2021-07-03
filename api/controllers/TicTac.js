module.exports = class TicTac {
  // Method to check whether board is valid
  is_valid(board) {
    // Calculate whether its o's turn
    const occ_for_0 =
      board.split("o").length - 1 - (board.split("x").length - 1);
    const occ_for_x =
      board.split("x").length - 1 - (board.split("o").length - 1);
    const valid_occ = [0, 1];
    // Check if board contains 0, x or spaces only and whether it's 0's turn
    if (
      (board.match(/^[o x]+$/g) && valid_occ.includes(occ_for_0)) ||
      valid_occ.includes(occ_for_x)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Method to check whether game is a tie
  is_game_tie(board) {
    if (board.includes(" ")) {
      return false;
    } else {
      return true;
    }
  }

  // Method to check which player is the winner
  is_player_winner(board, player) {
    console.log("hey");
    const win = [player, player, player];
    const win_horizontal = [
      [board[0], board[1], board[2]] === win,
      [board[3], board[4], board[5]] === win,
      [board[6], board[7], board[8]] === win,
    ];
    const win_vertical = [
      [board[0], board[3], board[6]] === win,
      [board[1], board[4], board[7]] === win,
      [board[2], board[5], board[8]] === win,
    ];
    const win_diagonal = [
      [board[0], board[4], board[8]] === win,
      [board[2], board[4], board[6]] === win,
    ];

    console.log(win_vertical);
    console.log(win_horizontal);
    console.log(win_diagonal);
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
    console.log(board[3]);
    console.log(board[4]);
    console.log(board[5]);

    return this.any(win_horizontal) || this.any(win_vertical) || this.any(win_diagonal);
  }

  any(iterable) {
    for (var index = 0; index < iterable.length; index++) {
      if (iterable[index]) return true;
    }
    return false;
  }
};
