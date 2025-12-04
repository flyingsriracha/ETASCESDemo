export interface WorkflowStepAction {
    label: string;
    severity?: 'primary' | 'secondary';
    icon?: string;
    nextStep?: number;
    command?: () => void;
}

export interface WorkflowStepComponent {
    type: 'file-upload' | 'text-input' | 'dropdown' | 'checkbox' | 'radio';
    label?: string;
    properties?: { [key: string]: any };
}

export interface WorkflowStepAsset {
    type: 'image' | 'video' | 'document';
    url: string;
    altText?: string;
}

export interface WorkflowStep {
    actor: 'agent' | 'user';
    step: number;
    message: string;
    actions?: WorkflowStepAction[];
    components?: WorkflowStepComponent[];
    assets?: WorkflowStepAsset[];
    nextStepOrder?: number;
}