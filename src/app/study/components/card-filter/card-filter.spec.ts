import { TestBed } from "@angular/core/testing";
import { CardFilterService } from "./card-filter.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('CardFilterService', () => {
    let cardFilter: CardFilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], 
            providers: [CardFilterService]
        })

        cardFilter = TestBed.inject(CardFilterService)
    })

    //first mock test (I had to add HttpClientTestingModule)
    it('should add two numbers', () => {
        const result = cardFilter.add(2, 2)
        expect(result).toBe(4)
    })

    it('should have correct user', () => {
        const filter = cardFilter.generateFilter({tags: ['6160b59e5bef2d2fd8fb849c']});
        const expectedUser = "61478fb9b2cfde16186509b5";
        expect(filter.user).toBe(expectedUser)
    })

    it('should generate correct filter', () => {
        const actualFilter = {
            user: '123',
            tags: ['546']
        }
        const expectedFilter = {
            user: '123',
            tags: ['546']
        }
        //toEqual instead of toBe for objects
        expect(actualFilter).toEqual(expectedFilter)
    })
})