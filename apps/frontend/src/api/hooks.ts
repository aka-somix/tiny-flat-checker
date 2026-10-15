import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateFlatCheck } from "@flat-checker/shared";
import { api } from "./client.js";

export function useHealth() {
  return useQuery({ queryKey: ["health"], queryFn: api.getHealth });
}

/** A published checklist version never changes, so it never goes stale. */
export function useChecklist(version: number | "current" | undefined) {
  return useQuery({
    queryKey: ["checklists", version],
    queryFn: () => api.getChecklist(version!),
    enabled: version !== undefined,
    staleTime: version === "current" ? 5 * 60_000 : Infinity,
  });
}

export function useFlatChecks(enabled = true) {
  return useQuery({ queryKey: ["flatchecks"], queryFn: api.listFlatChecks, enabled });
}

export function useFlatCheck(id: string, enabled = true) {
  return useQuery({ queryKey: ["flatchecks", id], queryFn: () => api.getFlatCheck(id), enabled });
}

export function useCreateFlatCheck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFlatCheck) => api.createFlatCheck(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flatchecks"] }),
  });
}

export function useDeleteFlatCheck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteFlatCheck(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flatchecks"] }),
  });
}

/** Imperative loader for a saved check plus the template version it was filled on (e.g. for a PDF). */
export function useLoadFlatCheckWithTemplate() {
  const qc = useQueryClient();
  return async (id: string) => {
    const flat = await qc.fetchQuery({ queryKey: ["flatchecks", id], queryFn: () => api.getFlatCheck(id) });
    const template = await qc.fetchQuery({
      queryKey: ["checklists", flat.templateVersion],
      queryFn: () => api.getChecklist(flat.templateVersion),
      staleTime: Infinity,
    });
    return { flat, template };
  };
}
