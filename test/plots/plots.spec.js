import {
  scaleTypeToAxisType
} from '../../src/plots/plots';
import expect from 'expect';

describe('Plots Test', () => {

  describe('Func: scaleTypeToAxisType', () => {

    it('should return the desired type when input is valid', () => {
      const linearType = 'linear';
      const timeType = 'time';
      const categoryType = 'category';

      expect(scaleTypeToAxisType(linearType)).toEqual('numeric');
      expect(scaleTypeToAxisType(timeType)).toEqual(timeType);
      expect(scaleTypeToAxisType(categoryType)).toEqual(categoryType);
    });

    it('should throw error if scaleType is not given or supported', () => {
      const unSupportedType = 'hello';
      const NoneTypeExecutor = () => { scaleTypeToAxisType(); };
      const unSupportedTypeExecutor = () => { scaleTypeToAxisType(unSupportedType); };

      expect(unSupportedTypeExecutor).toThrow(/hello/);
      expect(NoneTypeExecutor).toThrow(/scaleType should be provided/);
    });

  });
});
