import api from "@/interceptor/api";

interface PostProps {
  url: string;
  params?: object;
}

export const fetchData = async ({ url, params }: PostProps): Promise<any> => {
  const response = await api.get(url, { params } as any);
  return response.data.result;
};
