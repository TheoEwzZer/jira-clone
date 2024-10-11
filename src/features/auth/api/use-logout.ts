import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { ClientResponse } from "hono/client";
import { StatusCode } from "hono/utils/http-status";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$post>;

export const useLogout: () => UseMutationResult<
  ResponseType,
  Error,
  void,
  unknown
> = () => {
  const queryClient = useQueryClient();
  const router: AppRouterInstance = useRouter();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response: ClientResponse<ResponseType, StatusCode, "json"> =
        await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: (): void => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });
};
