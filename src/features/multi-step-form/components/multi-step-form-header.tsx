import {Progress} from "../../../components/ui/progress.tsx";

export function MultiStepFormHeader({ step, total }: { step: number; total: number }) {
    const value = (step / total) * 100

    return (
        <div className="p-4 border-b">
            <div className="mb-2 text-sm text-muted-foreground">
                Step {step} from {total}
            </div>
            <Progress  indicatorClassName="bg-green-500"  value={value} />
        </div>
    )
}