export enum Type {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

export enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export interface Site {
  id: number;
  url: string;
}

export interface TestRaw {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

export type Test = Omit<TestRaw, 'siteId'> & {
  site: string;
};

export type UrlParams = {
  id: string;
};

export enum SortType {
  ASC = 'ASC',
  DSC = 'DSC',
}

export enum SortValue {
  ASC = 'ASC',
  DSC = 'DSC',
}

export type Sort = {
  value: keyof Pick<Test, 'name' | 'type' | 'site' | 'status'>;
  type: SortType;
};
