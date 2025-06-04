class Responder {
  private res: any;

  constructor(res: any) {
    this.res = res;
  }

  success(message?: string, data?: any, status: number = 200) {
    return this.res.status(status).json({ message, data });
  }

  error(message?: string, status: number = 400) {
    return this.res.status(status).json({ message });
  }
}

export default Responder;
