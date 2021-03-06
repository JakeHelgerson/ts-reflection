export type PropertyOf<T> = keyof T;

export type PropertyName = string | number | symbol;

export interface PropertyDescriptor {
  name: PropertyName;
  flags: PropertyFlag;
}

export interface PropertyQuery {
  public?: boolean;
  protected?: boolean;
  private?: boolean;
  readonly?: boolean;
  optional?: boolean;
}

export enum PropertyFlag {
  PUBLIC = 1,
  PROTECTED = 2,
  PRIVATE = 4,
  OPTIONAL = 8,
  READONLY = 16,
}
