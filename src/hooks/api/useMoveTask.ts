import { useMutation } from '@tanstack/react-query';
import { moveTask as moveTaskApi } from '@/api/tasks';
import type { TaskStatus } from '../../../shared/types';
import { useQueryClient } from '@tanstack/react-query';

export const useMoveTask = () => {
  const queryClient = useQueryClient();
  const { mutate: moveTaskMutation } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => moveTaskApi(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { moveTaskMutation };
};
