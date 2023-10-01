import random, time


class GoL:
    def __init__(self, width=5, height=5, living="o", dead="x"):
        self.width = width
        self.height = height
        self.living = living
        self.dead = dead
        self.cells = [
            [random.choice([living, dead]) for i in range(width)] for j in range(height)
        ]

    def __repr__(self):
        board = []
        for row in self.cells:
            board.append("\t".join(cell for cell in row))
        return "\n\n".join(board)

    def step(self):
        current_cells = [row[:] for row in self.cells]

        for row in range(self.height):
            for col in range(self.width):
                up = row - 1
                down = row + 1
                left = col - 1
                right = col + 1

                # Count number of living neighbors around current cell
                living_neighbors = 0
                if up >= 0 and left >= 0 and current_cells[up][left] == self.living:
                    living_neighbors += 1
                if up >= 0 and current_cells[up][col] == self.living:
                    living_neighbors += 1
                if (
                    up >= 0
                    and right < self.width
                    and current_cells[up][right] == self.living
                ):
                    living_neighbors += 1
                if left >= 0 and current_cells[row][left] == self.living:
                    living_neighbors += 1
                if right < self.width and current_cells[row][right] == self.living:
                    living_neighbors += 1
                if (
                    down < self.height
                    and left >= 0
                    and current_cells[down][left] == self.living
                ):
                    living_neighbors += 1
                if down < self.height and current_cells[down][col] == self.living:
                    living_neighbors += 1
                if (
                    down < self.height
                    and right < self.width
                    and current_cells[down][right] == self.living
                ):
                    living_neighbors += 1

                # Now determine cell's state based on the rules of the game
                if current_cells[row][col] == self.living and (
                    living_neighbors == 2 or living_neighbors == 3
                ):
                    continue
                elif current_cells[row][col] == self.dead and living_neighbors == 3:
                    self.cells[row][col] = self.living
                else:
                    self.cells[row][col] = self.dead


# Introduction
print("Welcome to Conway's Game of Life!\n")
print(
    "The rules are simple:\n\t1. A living cell with less than 2 neighbors dies.\n\t2. A living cell with 2 or 3 living neighbors lives.\n\t3. A living cell with more than 3 neighbors dies.\n\t4. Lastly, A dead cell with exactly three living neighbors becomes alive.\n"
)
print("Once the game starts, if you would like to quit the game, press enter.")
print("Now, I will ask you for four inputs.\n")

no_size = False
no_sym = False

# Get inputs for the size of the cells
try:
    width, height = input(
        "Please input two numerical values for the width and height (or press enter to continue): "
    ).split()
    width = int(width)
    height = int(height)
except:
    print(
        "Size input error, base values of 5 will be used for both width and height.\n"
    )
    no_size = True

# Get inputs for the living and dead symbols
try:
    living, dead = input(
        "Please input two symbols to represent the living and the dead cells (or press enter to continue): "
    ).split()
except:
    print(
        'Symbol input error, base values of "o" and "x" will be used to represent living and dead cells, respectively.\n'
    )
    no_sym = True

if no_size and no_sym:
    gol = GoL()
elif no_size:
    gol = GoL(living=living, dead=dead)
elif no_sym:
    gol = GoL(width, height)
else:
    gol = GoL(width, height, living, dead)

count = 0
while True:
    print(f"Step {count}:")
    print(gol, "\n\n")
    gol.step()
    count += 1

    time.sleep(2)
