import { sleep } from './sleep';

export interface BatchPromiseFunctionCall<T> {
  func: (...args: any) => Promise<T>;
  args: any[];
}

export async function batchPromises<T>(
  items: BatchPromiseFunctionCall<T>[],
  batchSize: number,
  waitMs?: number,
  afterEachBatch?: (batchResults: T[]) => void
): Promise<T[]> {
  const results: T[][] = [];
  let promises: Promise<T>[] = [];

  const asyncMap = items.map(async ({ func, args }, index) => {
    promises.push(func(...args));
    if ((index > 0 && index % batchSize === 0) || index === items.length - 1) {
      const batchResults = await Promise.all(promises);
      results.push(batchResults);
      promises = [];

      if (waitMs) {
        await sleep(waitMs);
      }
      if (afterEachBatch) {
        afterEachBatch(batchResults);
      }
    }
  });
  await Promise.all(asyncMap);
  return results.reduce((flatResults, batchResults) => {
    return [...flatResults, ...batchResults];
  }, [] as T[]);
}
