export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource could not be found :/');
  }
}
