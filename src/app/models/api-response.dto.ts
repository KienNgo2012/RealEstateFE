export class ApiResponse<T> {
  isSuccessful!: boolean;
  errorCode: string | undefined;
  message: string | undefined;
  data: T | undefined;
}
