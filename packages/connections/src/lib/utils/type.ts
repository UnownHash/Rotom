type DataPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type DTO<T> = {
  [P in DataPropertyNames<T>]: T[P] extends object ? DTO<T[P]> : T[P];
};
