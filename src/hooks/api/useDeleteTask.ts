import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/api/tasks';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { deleteTaskMutation };
};
