import { DifficultyPipe } from './difficulty.pipe';

describe('DifficultyPipe', () => {

    const pipe = new DifficultyPipe();

    it('should return Very hard as difficulty level text', () => {
        expect(pipe.transform(10)).toBe('Very hard');
        expect(pipe.transform(9)).toBe('Very hard');
    });

    it('should return Hard as difficulty level text', () => {
        expect(pipe.transform(8)).toBe('Hard');
        expect(pipe.transform(7)).toBe('Hard');
    });

    it('should return Medium as difficulty level text', () => {
        expect(pipe.transform(6)).toBe('Medium');
        expect(pipe.transform(5)).toBe('Medium');
        expect(pipe.transform(4)).toBe('Medium');
    });

    it('should return Easy as difficulty level text', () => {
        expect(pipe.transform(3)).toBe('Easy');
        expect(pipe.transform(2)).toBe('Easy');
    });

    it('should return Very easy as difficulty level text', () => {
        expect(pipe.transform(1)).toBe('Very easy');
        expect(pipe.transform(0)).toBe('Very easy');
    });
});