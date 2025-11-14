import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/useWorkflows";
import { FlaskConicalIcon } from "lucide-react";

export const ExcuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const excuteWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    excuteWorkflow.mutate({ id: workflowId });
  };

  return (
    <Button
      size={"lg"}
      onClick={handleExecute}
      disabled={excuteWorkflow.isPending}
    >
      <FlaskConicalIcon className="size-4" />
      <span>Execute Workflow</span>
    </Button>
  );
};
