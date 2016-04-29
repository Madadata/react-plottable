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
  const linearScale = createScale('linear');
  const timeScale = createScale('time');
  const categoryScale = createScale('category');

  describe('Func: createAxis', () => {

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
      const createHelloAxisExecutor = () => {
        createAxis(linearScale, 'bottom', 'hello');
      };

      expect(createHelloAxisExecutor).toThrow();
    })

  });

  describe('Func: createAxes', () => {
    const xConfig = {
      xScale: categoryScale,
      xOrientation: 'bottom',
      xType: 'category',
    };
    const yConfig = {
      yScale: linearScale,
      yOrientation: 'left',
      yType: 'numeric',
    };

    it('should throw error if relevent parameters are not given', () => {
      const createNoneAxesExecutor = () => { createAxes(); };
      const createEmptyObjectAxesExecutor = () => { createAxes({}); };
      const createOneAxesExecutor = () => { createAxes({ xConfig }); };

      expect(createNoneAxesExecutor).toThrow();
      expect(createEmptyObjectAxesExecutor).toThrow(/xConfig/);
      expect(createOneAxesExecutor).toThrow(/xConfig/);
    });
  });

});
