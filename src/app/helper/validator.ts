export class Validator {
  public static isEmpty(text: string | undefined): boolean {
    return text === "" || text === null|| text === undefined;
  }
}
