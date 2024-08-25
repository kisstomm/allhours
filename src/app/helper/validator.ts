export class Validator {
  public static readonly EMAIL_REGEXP = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,5}$/;
  public static isEmpty(text: string | undefined): boolean {
    return text === "" || text === null|| text === undefined;
  }

  public static isEmail(text: string | undefined): boolean {
    if(text === undefined) {
      return false;
    }

    return this.EMAIL_REGEXP.test(text);
  }
}
