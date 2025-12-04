import { Component } from '@angular/core';
import { WorkflowStep } from '../workflows/workflow-step.interface';
import { MockWorkflowService } from '../mock-workflow.service';
import { set } from 'video.js/dist/types/tech/middleware';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss'
})

export class AiChatComponent {
  
  chatContent:WorkflowStep[] = [];
  uploadedFiles: any[] = [];
  stepNr: number = 0;
  showSpinner: boolean = false;
  dialogImageSrc: string = '';
  dialogImageAlt: string | undefined = '';
  dialogVisible: boolean = false;

  constructor(private workflowService: MockWorkflowService) {
    const stepContent = this.workflowService.getNextWorkflowStep();

    if (stepContent) {
      this.chatContent.push(stepContent);
    }
  }

  getNextStep(stepNr?: number): void {
    let nextStep;
    if (stepNr !== undefined) {
      nextStep = this.workflowService.getNextWorkflowStep(stepNr);
    } else {
      nextStep = this.workflowService.getNextWorkflowStep();
    }

    if (nextStep) {
      this.showSpinner = true;
      this.stepNr = this.workflowService.getStepNr();

      setTimeout(() => {
        this.chatContent.push(nextStep);
        this.showSpinner = false;
      }, 500);
      //this.setChatContent(this.currentSteps);
    }
  }

  showDialog(imSrc: string, imAlt: string | undefined) {
    this.dialogImageSrc = imSrc;
    this.dialogImageAlt = imAlt ? imAlt : '';
    this.dialogVisible = true;
  }

  /*
   * Mock methods
  */
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}