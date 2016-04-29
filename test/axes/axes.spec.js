import {
  createAxis,
  createAxes
} from '../../src/axes/axes';
import {
  createScale,
  createScales
} from '../../src/scales/scales';
import expect from 'expect';

describe('Axes Test', () => {

  describe('Func: createAxis', () => {
    const linearScale = createScale('linear');
    const timeScale = createScale('time');
    const categoryScale = createScale('category');

    it('should create the right axes if inputs are right', () => {
      const numericAxis = createAxis(linearScale, 'bottom', 'numeric');
      const timeAxis = createAxis(timeScale, 'bottom', 'time');
      const categoryAxis = createAxis(categoryScale, 'bottom', 'time');

      const ExpectedNumericAxis = new Plottable.Axes.Numeric(
        new Plottable.Scales.Linear(), 'bottom'
      );
      const ExpectedTimeAxis = new Plottable.Axes.Time(
        new Plottable.Scales.Time(), 'bottom'
      );
      const ExpectedCategoryAxis = new Plottable.Axes.Category(
        new Plottable.Scales.Category(), 'bottom'
      );

      expect(numericAxis).toEqual(ExpectedNumericAxis);
      expect(timeAxis).toEqual(ExpectedTimeAxis);
      expect(categoryAxis).toEqual(categoryAxis);
    });

    it('should throw error if number of parameters is less than 3', () => {
      const numericAxisNone = () => { createAxis(); };
      const numericAxisOne = () => { createAxis(linearScale); };
      const numericAxisTwo = () => { createAxis(linearScale, 'bottom'); };

      expect(numericAxisNone).toThrow();
      expect(numericAxisOne).toThrow();
      expect(numericAxisTwo).toThrow();
    });

    it('should throw error if type is not supported', () => {
      const createHelloAxis = () => {
        createAxis(linearScale, 'bottom', 'hello');
      };

      expect(createHelloAxis).toThrow();
    })

  });

});
