export class ExpressError extends Error {
  constructor(
    private status: number = 500,
    message: string = "Something went wrong!",
    private props?: any
  ) {
    super(message);
  }

  public get getStatus(): number {
    return this.status;
  }

  public get getProps(): any {
    return this.props;
  }
}
