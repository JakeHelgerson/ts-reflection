import 'jest';

import { assert, notALiteral } from '../utils';

// @ts-ignore
import { isA, typeCheckFor } from 'ts-reflection';
import fc from 'fast-check';

describe('enums', () => {
  describe('non-const', () => {
    test('without values', () => {
      enum Enum {
        A,
        B,
      }

      type TypeReference1 = Enum;

      const validArbitrary = fc.constantFrom(Enum.A, Enum.B);
      const invalidArbitrary = fc.anything().filter(notALiteral(Enum.A, Enum.B));

      assert(validArbitrary, invalidArbitrary, [typeCheckFor<TypeReference1>(), (value) => isA<TypeReference1>(value)]);
    });

    test('with values', () => {
      enum Enum {
        A = 7,
        B = 'ole',
      }

      type TypeReference1 = Enum;

      const validArbitrary = fc.constantFrom(Enum.A, Enum.B);
      const invalidArbitrary = fc.anything().filter(notALiteral(Enum.A, Enum.B));

      assert(validArbitrary, invalidArbitrary, [typeCheckFor<TypeReference1>(), (value) => isA<TypeReference1>(value)]);
    });
  });

  describe('const', () => {
    test('without values', () => {
      const enum Enum {
        A,
        B,
      }

      type TypeReference1 = Enum;

      const validArbitrary = fc.constantFrom(Enum.A, Enum.B);
      const invalidArbitrary = fc.anything().filter(notALiteral(Enum.A, Enum.B));

      assert(validArbitrary, invalidArbitrary, [typeCheckFor<TypeReference1>(), (value) => isA<TypeReference1>(value)]);
    });

    test('with values', () => {
      const enum Enum {
        A = 7,
        B = 'ole',
      }

      type TypeReference1 = Enum;

      const validArbitrary = fc.constantFrom(Enum.A, Enum.B);
      const invalidArbitrary = fc.anything().filter(notALiteral(Enum.A, Enum.B));

      assert(validArbitrary, invalidArbitrary, [typeCheckFor<TypeReference1>(), (value) => isA<TypeReference1>(value)]);
    });
  });
});