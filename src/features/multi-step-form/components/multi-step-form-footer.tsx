import styles from "./multi-step-form.module.css";
import {Button} from "../../../components/ui/button.tsx";

export function MultiStepFormFooter({onNext, onBack, onSave, disableNext, isLastStep}: {
    onNext: () => void;
    onBack: () => void;
    onSave: () => void;
    disableNext?: boolean;
    isLastStep?: boolean
}) {
    return (
        <div className={styles.multiStepFormFooter}>
            <div className="flex justify-between p-2 border-t">
                <Button className="hover:bg-blue-200" variant="outline" onClick={onBack}>
                    Prev Step
                </Button>
                {
                    isLastStep ?
                        <Button className="hover:bg-blue-200 bg-green-500 text-white" variant="outline"
                                disabled={disableNext} onClick={onSave}>
                            Save Data
                        </Button> :
                        <Button className="hover:bg-blue-200" variant="outline" disabled={disableNext} onClick={onNext}>
                            Next Step
                        </Button>
                }
            </div>
        </div>
    )
}