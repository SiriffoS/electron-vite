export class Section {
  id = 0;
  title = "";
  variant: Variant = Variant.Standard;
  size: Size = Size.MD;
  direction: Direction = Direction.Column;
}

export enum Variant {
  Standard = "Standard",
  Feature = "Feature",
}

export enum Size {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum Direction {
  Row = "row",
  Column = "column",
}
