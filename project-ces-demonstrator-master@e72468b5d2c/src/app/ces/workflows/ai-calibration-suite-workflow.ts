import { WorkflowStep } from "./workflow-step.interface";

export const AiCalibrationSuiteWorkflow: WorkflowStep[] = [
    {
        step: 0,
        actor: 'agent',
        message: 'Welcome to the AI Calibration Suite! Would you like to start a new calibration or continue with an existing model?',
        actions: [
            {
                label: 'Start New',
                severity: 'secondary',
                nextStep: 1
            },
            {
                label: 'Continue',
                severity: 'primary',
                nextStep: 2
            }
        ]
    },
    {
        step: 1,
        actor: 'agent',
        message: 'Okay, let\'s start a new calibration. Please upload a FMU file to proceed.',
        actions: [],
        components: [
            {
                type: 'file-upload',
            }
        ]
    },
    {
        step: 2,
        actor: 'agent',
        message: 'Let\'s continue with the calibration project "Torque FMU demo". You worked on it on Jan 04, 2026 the last time. Should we continue with this project?',
        actions: [
            {
                label: 'No, select another one',
                severity: 'secondary',
                nextStep: 3
            },
            {
                label: 'Yes, continue',
                severity: 'primary',
                nextStep: 4
            }
        ],
        assets: [
            {
                type: 'image',
                url: 'assets/ces/images/TorqueAscmo.png',
                altText: 'Screenshot of Torque FMU demo project'
            },
            {
                type: 'image',
                url: 'assets/ces/images/TorqueModel_opt.jpg',
                altText: 'Screenshot of Torque FMU demo project'
            }
        ]
    }

];