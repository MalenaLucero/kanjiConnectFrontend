import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { MatSnackBar } from "@angular/material/snack-bar";
import { StudyModule } from "../../study.module"
import { DifficultyButtonsComponent } from "./difficulty-buttons.component"

describe('DifficultyButtonsComponent', () => {
    let component: DifficultyButtonsComponent;
    let fixture: ComponentFixture<DifficultyButtonsComponent>;
    let matSnackBarMock: MatSnackBar;

    beforeEach(waitForAsync(() => {
        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            imports: [StudyModule],
            providers: [ { provide: MatSnackBar, useValue: matSnackBarMock }]
        }).compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(DifficultyButtonsComponent);
            component = fixture.componentInstance;
        })
    }))

    it("should create component", () => {
        expect(component).toBeTruthy()
    });

    it('should return a number between 0 and 10', () => {
        component.difficulty = 5;
        const happyEasyResult = component.setNewDifficulty('easy');
        component.difficulty = 1;
        const negativeEasyResult = component.setNewDifficulty('easy');
        component.difficulty = 5;
        const happyOkResult = component.setNewDifficulty('OK');
        component.difficulty = 0;
        const negativeOkResult = component.setNewDifficulty('OK');
        component.difficulty = 5;
        const happyHardResult = component.setNewDifficulty('hard');
        component.difficulty = 10;
        const biggerThanTenHardResult = component.setNewDifficulty('hard');

        expect(happyEasyResult).withContext('Error setting easy result in happy path').toBe(3);
        expect(negativeEasyResult).withContext('Error setting easy result in unhappy path').toBe(0);
        expect(happyOkResult).withContext('Error setting OK result in happy path').toBe(4);
        expect(negativeOkResult).withContext('Error setting OK result in unhappy path').toBe(0);
        expect(happyHardResult).withContext('Error setting hard result in happy path').toBe(6);
        expect(biggerThanTenHardResult).withContext('Error setting hard result in unhappy path').toBe(10);
    })

    it('should show error snack bar with null difficulty', () => {
        component.updateDifficulty('easy');
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with non-integer difficulty', () => {
        component.updateDifficulty('easy');
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with negative difficulty', () => {
        component.updateDifficulty('easy');
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with difficulty greater than 10', () => {
        component.updateDifficulty('easy');
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with difficulty greater than 10', () => {
        const spyUpdate = spyOn(component.updatedDifficultyEmitter, 'emit') //arrange
        component.difficulty = 5;
        component.updateDifficulty('OK'); //act
        expect(spyUpdate).toHaveBeenCalledWith(4) //assert
    })
})