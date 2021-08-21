export type Performance = {
  playID: string;
  audience: number;
};

export enum PlayType {
  tragedy = "tragedy",
  comedy = "comedy",
}

export type Play = {
  name: string;
  type: PlayType;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};
