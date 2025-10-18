import api from "@/interceptor/api";

interface MutationProps {
  url: string;
  body?: object;
  params?: object;
}

export const Post = async ({ url, body, params }: MutationProps): Promise<any> => {
  const response = await api.post(url, body, { params } as any);
  return response.data.result ?? response;
};

export const Delete = async ({ url, params }: MutationProps): Promise<any> => {
  const response = await api.delete(url, { params } as any);
  return response;
};

export const Patch = async ({ url, body }: MutationProps): Promise<any> => {
  const response = await api.patch(url, body);
  return response;
};

export const Put = async ({ url, body }: MutationProps): Promise<any> => {
  const response = await api.put(url, body);
  return response;
};
