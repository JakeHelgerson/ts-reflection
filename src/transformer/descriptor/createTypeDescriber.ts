import { Logger } from '../logger';
import { ResolveTypeDescriptor, getTypeDescriptor } from './getTypeDescriptor';
import { TypeDescriptor, TypeDescriptorMap, TypeName, TypeNameResolver } from '../types';
import { getUniqueTypeName } from './getUniqueTypeName';
import { objectFlags, typeFlags } from '../utils';
import ts from 'typescript';

export const createTypeDescriber = (
  logger: Logger,
  program: ts.Program,
  typeChecker: ts.TypeChecker,
): [TypeNameResolver, TypeDescriptorMap] => {
  const resolvedTypeNames: Map<ts.Type, TypeName> = new Map();
  const resolvedTypeDescriptors: TypeDescriptorMap = new Map();

  function describeType(scope: ts.TypeNode, type: ts.Type): TypeName {
    const rawTypeName = typeChecker.typeToString(type);

    // Check whether we already have a type check for this type
    const resolvedTypeName = resolvedTypeNames.get(type);
    if (resolvedTypeName) {
      logger.debug('\tType already resolved: ', rawTypeName);

      return resolvedTypeName;
    }

    logger.info('Describing', rawTypeName);
    logger.debug('\tType flags: ', typeFlags(type).join(', '));
    logger.debug('\tObject flags: ', objectFlags(type).join(', '));

    const uniqueTypeName = getUniqueTypeName(rawTypeName, Array.from(resolvedTypeNames.values()));

    resolvedTypeNames.set(type, uniqueTypeName);

    const typeDescriptor = resolveTypeDescriptor(getTypeDescriptor(logger.indent(), program, type, scope));
    resolvedTypeDescriptors.set(uniqueTypeName, typeDescriptor);

    return uniqueTypeName;
  }

  function resolveTypeDescriptor(typeDescriptor: TypeDescriptor | ResolveTypeDescriptor): TypeDescriptor {
    return typeof typeDescriptor === 'function'
      ? typeDescriptor((scope, type) => describeType(scope, type))
      : typeDescriptor;
  }

  return [describeType, resolvedTypeDescriptors];
};
