import { Injectable } from '@angular/core';
import { WorkflowStep } from './workflows/workflow-step.interface';

@Injectable({
  providedIn: 'root'
})
export class MockWorkflowService {

  workflowSteps: WorkflowStep[] = [];
  stepNumber: number = 0;

  constructor() { }

  setWorkflow(steps: WorkflowStep[]) {
    this.workflowSteps = steps;
  }

  getNextWorkflowStep(stepNr?: number): WorkflowStep | null {
    if (stepNr !== undefined) {
      const step = this.workflowSteps.find(s => s.step === stepNr);
      this.stepNumber = stepNr;
      return step || null;
    }

    if (this.stepNumber < this.workflowSteps.length) {
      return this.workflowSteps[this.stepNumber++];
    }
    return null;
  }

  getStepNr() {
    return this.stepNumber;
  }
}
