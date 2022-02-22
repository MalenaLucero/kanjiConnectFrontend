import { FirstTitlecasePipe } from "./first-titlecase.pipe"

describe('firstTitlecasePipe', () => {
    const pipe = new FirstTitlecasePipe();

    it('should return string with first letter in titlecase', () => {
        expect(pipe.transform('una palabra')).toBe('Una palabra')
    })

    it('should return empty string when null', () => {
        expect(pipe.transform(null)).toBe('')
    })
})