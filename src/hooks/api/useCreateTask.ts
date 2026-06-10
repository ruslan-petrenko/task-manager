import { createTask } from '@/api/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTaskMutation } = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { createTaskMutation };
};
