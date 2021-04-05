# 2048

A 2048 revisited game, using laws of mathematical probabilities distribution.

## Usage

Once you cloned the project, run `yarn install` to install all the dependencies of the project. Afterwards, you just have to run `yarn dev` to launch the development server. The project using [Vite](https://vitejs.dev/guide/why.html), the development server provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

## Game rules

A game of 2048 is played on a 4×4 board. Each position on the board may be empty or may contain a tile, and each tile will have a number on it. In our version, the tile may be a special tile.

When we start, the board will have two tiles in random locations.

### Moves

Moves are performed by shifting all tiles towards one edge – up, down, left, or right. When doing this, any tiles with the same value that are adjacent to each other and are moving together will merge and end up with a new tile equal to the sum of the earlier two.

After we’ve made a move, a new tile will be placed onto the board. This is placed in a random location, and will be a classic or a special tile, in the same way as the initial tiles.

The game then continues until there are no more moves possible.

The goal of the game is to reach a single tile with a value of “2048”. If you do so, you win. Easy as pie.

### Tiles

There are multiple tile types.

The classic tile from the original game, which either has a “2” or a “4” on it – each has an independent chance to appear.

The obstacle tile, to which is associated a number of movements. It cannot be merged to another and it will block you in some situations. It will disappear once you complete the required number of moves.

The joker tile, which can merge with any of the squares on the board.

The secret tile, which represents either a "2", "4", "8" or a "16" – each has an independent chance to be picked. Unfortunately, you can't tell. So you have to test it and play it to find out.

Each has of these tiles has an independent chance to appear.

## Probability explanation

Solving this particualr game is an interesting problem because it has multiple random components. It’s impossible to correctly predict not only where each new tile will be placed, but whether it will be a classic tile (“2” or a “4”) or a special tile (obstacle, joker, secret), which themselves have their own probabilistic parameters.
