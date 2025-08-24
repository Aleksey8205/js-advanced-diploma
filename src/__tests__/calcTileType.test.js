describe('Function calcTileType', () => {
    const boardSize = 8; 
  
    test('should correctly identify top-left corner', () => {
      expect(calcTileType(0, boardSize)).toBe('top-left');
    });
  
    test('should correctly identify top-right corner', () => {
      expect(calcTileType(boardSize - 1, boardSize)).toBe('top-right');
    });
  
    test('should correctly identify bottom-left corner', () => {
      expect(calcTileType((boardSize * (boardSize - 1)), boardSize)).toBe('bottom-left');
    });
  
    test('should correctly identify bottom-right corner', () => {
      expect(calcTileType((boardSize * boardSize) - 1, boardSize)).toBe('bottom-right');
    });
  
    test('should correctly identify left side cells', () => {
      expect(calcTileType(4, boardSize)).toBe('left');
      expect(calcTileType(8, boardSize)).toBe('left');
    });
  
    test('should correctly identify right side cells', () => {
      expect(calcTileType(3, boardSize)).toBe('right');
      expect(calcTileType(7, boardSize)).toBe('right');
    });
  
    test('should correctly identify top row cells', () => {
      expect(calcTileType(1, boardSize)).toBe('top');
      expect(calcTileType(2, boardSize)).toBe('top');
    });
  
    test('should correctly identify bottom row cells', () => {
      expect(calcTileType(12, boardSize)).toBe('bottom');
      expect(calcTileType(13, boardSize)).toBe('bottom');
    });
  
    test('should correctly identify central cells', () => {
      expect(calcTileType(5, boardSize)).toBe('center');
      expect(calcTileType(6, boardSize)).toBe('center');
    });
  });