import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { ClientResponse } from "hono/client";
import { StatusCode } from "hono/utils/http-status";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login.$post>;
type RequestType = InferRequestType<typeof client.api.auth.login.$post>;

export const useLogin: () => UseMutationResult<
  ResponseType,
  Error,
  RequestType,
  unknown
> = () => {
  const queryClient = useQueryClient();
  const router: AppRouterInstance = useRouter();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response: ClientResponse<ResponseType, StatusCode, "json"> =
        await client.api.auth.login.$post({ json });
      return await response.json();
    },
    onSuccess: (): void => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });
};