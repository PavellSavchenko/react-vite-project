import styles from "./multi-step-form.module.css";
import {Button} from "../../../components/ui/button.tsx";

export function MultiStepFormFooter({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
        <div className={styles.multiStepFormFooter}>
            <div className="flex justify-between p-2 border-t">
                <Button className="hover:bg-blue-200" variant="outline" onClick={onBack}>
                    Prev Step
                </Button>
                <Button className="hover:bg-blue-200" variant="outline" onClick={onNext}>
                    Next Step
                </Button>
            </div>
        </div>
    )
}