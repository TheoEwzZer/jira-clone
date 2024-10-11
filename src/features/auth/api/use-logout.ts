import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { ClientResponse } from "hono/client";
import { StatusCode } from "hono/utils/http-status";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$post>;

export const useLogout: () => UseMutationResult<
  ResponseType,
  Error,
  void,
  unknown
> = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response: ClientResponse<ResponseType, StatusCode, "json"> =
        await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });
};
