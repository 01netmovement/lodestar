/**
 * @module chores
 */

export interface ITask {
  run(): Promise<void>;
}
