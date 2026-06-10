import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask as updateTaskApi } from '@/api/tasks';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { updateTaskMutation };
};
