import { Status } from "../../types";

export const TestStatusToModifierDict = {
  DRAFT: 'draft',
  ONLINE: 'online',
  PAUSED: 'paused',
  STOPPED: 'stopped',
} as const satisfies { [K in Status]: Lowercase<K> };

export const Colors = {
  Pink: 'pink',
  Red: 'red',
  Violet: 'violet',
} as const;
