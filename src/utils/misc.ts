/**
 * Returns true when `property` is a `obj`'s property.
 * Benefit of this function is that it also hints TypeScript about more
 * narrow type of `obj`, for example when using in ternary operator.
 *
 * @example hasOwn({ foo: 1 }, 'foo') // true
 * @example hasOwn({ foo: 1 }, 'bar') // false
 */
export function hasOwn<ObjectType, Property extends string>(
  obj: ObjectType,
  property: Property,
): obj is ObjectType & { [Key in Property]: any } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.prototype.hasOwnProperty.call(obj, property)
  );
}
