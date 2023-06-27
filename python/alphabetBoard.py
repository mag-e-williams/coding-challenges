# On an alphabet board, we start at position (0, 0), corresponding to character board[0][0].

# Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"], as shown in the diagram below.

# We may make the following moves:

# 'U' moves our position up one row, if the position exists on the board;
# 'D' moves our position down one row, if the position exists on the board;
# 'L' moves our position left one column, if the position exists on the board;
# 'R' moves our position right one column, if the position exists on the board;
# '!' adds the character board[r][c] at our current position (r, c) to the answer.
# (Here, the only positions that exist on the board are positions with letters on them.)

# Return a sequence of moves that makes our answer equal to target in the minimum number of moves.  You may return any path that does so.

# Example 1:

# Input: target = "leet"
# Output: "DDR!UURRR!!DDD!"
# Example 2:

# Input: target = "code"
# Output: "RR!DDRR!UUL!R!"
 

# Constraints:

# 1 <= target.length <= 100
# target consists only of English lowercase letters.


board = ["abcde", 
         "fghij", 
         "klmno", 
         "pqrst", 
         "uvwxy", 
         "z"
        ]

class Solution:
    def __init__(self):
        self.board = board
    
    def getLetterCoords(self, char) -> str:
        for r in range(len(board)):
            row = board[r]
            if char in row: 
                c = row.find(char)
                return [r, c]
        return '#ERROR'
                
    def getMoves(self, startingPos, letterPos):
        moves = ''
        delta_c = letterPos[0] - startingPos[0]
        delta_r = letterPos[1] - startingPos[1]
       
        if delta_r == 0 and delta_c == 0: moves += '!'
 

        else:
            if startingPos[0] == 5 and letterPos[0] != 5:
                moves += 'U'
                delta_c += 1
        
            elif letterPos[0] == 5 and startingPos[0] != 5:
                moves += abs(delta_r) * 'L'
                delta_r = 0        
     
            
            if delta_c > 0: moves += delta_c * 'D'
            elif delta_c < 0: moves += abs(delta_c) * 'U'

            if delta_r > 0: moves += delta_r * 'R'
            elif delta_r < 0: moves += abs(delta_r) * 'L'
            
            moves += '!'
            
        return moves
    
    def alphabetBoardPath(self, target: str) -> str:
        startPos = [0,0]
        moves = ''
        for c in target: 
            letterPos = self.getLetterCoords(c)
            moves += self.getMoves(startPos, letterPos)
            startPos = letterPos
        
        return(moves)