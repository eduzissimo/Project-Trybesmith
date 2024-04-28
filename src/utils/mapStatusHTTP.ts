export default function mapStatusHTTP(status: string): number {
  const statusMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
  };
  return statusMap[status] || 500;
}