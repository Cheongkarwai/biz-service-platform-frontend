export class ErrorResponse {

  constructor(public message: string, public fieldErrors: object, public code: string, public timestamp: Date) {}

}
