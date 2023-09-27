import random


class GoL:
    def __init__(self, width=6, height=6):
        self.width = width
        self.height = height
        self.cells = [
            [random.choice(["o", "x"]) for i in range(width)] for j in range(height)
        ]

    def __repr__(self):
        board = []
        for row in self.cells:
            board.append("\t".join(cell for cell in row))
        return "\n\n".join(board)


gol = GoL(6, 6)
print(gol)
