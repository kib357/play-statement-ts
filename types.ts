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

export type StatementPerformance = Performance & {
  play: Play;
  amount: number;
  volumeCredits: number;
};

export type StatementData = {
  customer: string;
  performances: StatementPerformance[];
  totalAmount: number;
  totalVolumeCredits: number;
};