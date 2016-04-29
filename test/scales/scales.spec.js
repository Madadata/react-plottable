import {
  createScale,
  createScales
} from '../../src/scales/scales';
import expect from 'expect';

describe('Scales Tests:', () => {
  describe('Func: createScale', () => {

    it('should return if the inputs are valid', () => {
      const linear = createScale('linear');
      const category = createScale('category');
      const color = createScale('color');
      const colorRange = ['rgb(14, 88, 65)', 'rgb(140, 237, 207)'];
      const interpolatedColor = createScale(
        'interpolatedcolor',
        colorRange
      );
      const expectedIColor = new Plottable.Scales.InterpolatedColor();
      expectedIColor.range()
      expect(linear).toEqual(new Plottable.Scales.Linear());
      expect(category).toEqual(new Plottable.Scales.Category());
      expect(color).toEqual(new Plottable.Scales.Color());
      expect(interpolatedColor).toEqual(interpolatedColor);
    });

    it('should throw error if no input is given', () => {
      const createNoneScale = () => { createScale(); };
      expect(createNoneScale).toThrow();
    });

    it('should throw error if range is not given in case of interpolatedcolor', () => {
      const createInterpolatedColorWithoutRange = () => {
        createScale('interpolatedcolor');
      };
      expect(createInterpolatedColorWithoutRange).toThrow();
    });

    it('should throw error the scale type is not supported', () => {
      const createHelloScale = () => { createScale('hello'); };
      expect(createHelloScale).toThrow();
    });

  });

  describe('Func: createScales', () => {
    it('should return scales as required', () => {
      const { xScale, yScale } = createScales('time', 'linear');
      expect(xScale).toEqual(new Plottable.Scales.Time());
      expect(yScale).toEqual(new Plottable.Scales.Linear());
    })
  });
});
