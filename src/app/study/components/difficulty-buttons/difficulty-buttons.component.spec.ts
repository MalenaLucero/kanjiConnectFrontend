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
        const happyEasyResult = component.setNewDifficulty('easy', 5);
        expect(happyEasyResult).withContext('Error setting easy result in happy path').toBe(3);
        const negativeEasyResult = component.setNewDifficulty('easy', 1);
        expect(negativeEasyResult).withContext('Error setting easy result in unhappy path').toBe(0);

        const happyOkResult = component.setNewDifficulty('OK', 5);
        expect(happyOkResult).withContext('Error setting OK result in happy path').toBe(4);
        const negativeOkResult = component.setNewDifficulty('OK', 0);
        expect(negativeOkResult).withContext('Error setting OK result in unhappy path').toBe(0);

        const happyHardResult = component.setNewDifficulty('hard', 5);
        expect(happyHardResult).withContext('Error setting hard result in happy path').toBe(6);
        const biggerThanTenHardResult = component.setNewDifficulty('hard', 10);
        expect(biggerThanTenHardResult).withContext('Error setting hard result in unhappy path').toBe(10);
    })

    it('should show error snack bar with null difficulty', () => {
        component.updateDifficulty('easy', null);
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with non-integer difficulty', () => {
        component.updateDifficulty('easy', 1.5);
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with negative difficulty', () => {
        component.updateDifficulty('easy', -1);
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })

    it('should show error snack bar with difficulty greater than 10', () => {
        component.updateDifficulty('easy', 11);
        expect(matSnackBarMock.open).toHaveBeenCalledWith('Invalid difficulty', 'Error', { duration: 3000 })
    })
})