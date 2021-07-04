module.exports = class TicTac {
  get_prospective_board(board, player) {
    // Go through all possible moves the player is expected to make
    for (let i = 0; i < board.length; i++) {
      if (board[i] == " ") {
        return this.move(board, i, player);
      }
    }
  }

  move(board, index, player) {
    let splitted_board = board.split("");
    splitted_board[index] = player;
    console.log(splitted_board);
    console.log(splitted_board.join(""));
    return splitted_board.join("");
  }

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
    const win = [player, player, player];

    // Check win variable against all possible winning scenarios
    const win_horizontal = [
      this.arrayMatch([board[0], board[1], board[2]], win),
      this.arrayMatch([board[3], board[4], board[5]], win),
      this.arrayMatch([board[6], board[7], board[8]], win),
    ];
    const win_vertical = [
      this.arrayMatch([board[0], board[3], board[6]], win),
      this.arrayMatch([board[1], board[4], board[7]], win),
      this.arrayMatch([board[2], board[5], board[8]], win),
    ];
    const win_diagonal = [
      this.arrayMatch([board[0], board[4], board[8]], win),
      this.arrayMatch([board[2], board[4], board[6]], win),
    ];

    return (
      this.any(win_horizontal) ||
      this.any(win_vertical) ||
      this.any(win_diagonal)
    );
  }

  // Method to check if two array match
  arrayMatch(line, win) {
    return JSON.stringify(line) == JSON.stringify(win);
  }

  // Method to find if there any true value in an array
  any(iterable) {
    for (var index = 0; index < iterable.length; index++) {
      if (iterable[index]) return true;
    }
    return false;
  }

  get_move(board, player) {
    //Given a board and the computer's letter, determine where to move and return that move.
    const human = "o";
    const computer = "x";

    // Game Algorithm

    // Check if computer can win in the next move
    for (let i = 0; i <= 8; i++) {
      // Get a copy of the array
      let copy = board.slice();
      if (!this.is_game_tie(copy)) {
        this.makeMove(copy, computer, i);
        if (this.is_player_winner(copy, computer)) {
          return i;
        }
      }
    }

    //Check if human can win on next move, and block them.
    for (let i = 0; i <= 8; i++) {
      let copy = board.slice();
      if (!this.is_game_tie(copy)) {
        this.makeMove(copy, human, i);
        if (this.is_player_winner(copy, human)) {
          return i;
        }
      }
    }

    // Try to take one of the corners, if they are free.
    let move = this.chooseRandomMoveFromList(board, [0, 3, 7, 8]);
    if (move !== "") {
      return move;
    }
    // Try to take the center, if it is free.
    if (this.isSpaceFree(board, 5)) {
      return 5;
    }
    // Move on one of the sides.
    return this.chooseRandomMoveFromList(board, [2, 4, 6, 8]);
  }

  chooseRandomMoveFromList(board, list) {
    let possibleMoves = [];

    for (let i = 0; i < list.length; i++) {
      if (this.isSpaceFree(board, i)) {
        possibleMoves.push(i);
      }
    }

    if (possibleMoves.length !== 0) {
      return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    } else {
      return null;
    }
  }
  isSpaceFree(board, move) {
    return board[move] === " ";
  }

  makeMove(board, char, move) {
    board = board.split("");
    board[move] = char;
  }
};
