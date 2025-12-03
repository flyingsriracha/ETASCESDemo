import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AiCalibrationSuiteWorkflow } from '../workflows/ai-calibration-suite-workflow';
import { MockWorkflowService } from '../mock-workflow.service';
import { WorkflowStep } from '../workflows/workflow-step.interface';
import { AiChatComponent } from '../ai-chat/ai-chat.component';

@Component({
  selector: 'app-ai-calibration-suite',
  templateUrl: './ai-calibration-suite.component.html',
  styleUrl: './ai-calibration-suite.component.scss'
})

export class AiCalibrationSuiteComponent implements AfterViewInit {

  @ViewChild(AiChatComponent) aiChatComponent!: AiChatComponent;
  currentSteps: WorkflowStep[] = [];

  constructor(private workflowService: MockWorkflowService) {
    workflowService.setWorkflow(AiCalibrationSuiteWorkflow);
  }

  ngAfterViewInit(): void {
   // this.getNextStep();
  }

  // getNextStep(stepNr?: number): void {
  //   let nextStep;
  //   if (stepNr !== undefined) {
  //     nextStep = this.workflowService.getNextWorkflowStep(stepNr);
  //   } else {
  //     nextStep = this.workflowService.getNextWorkflowStep();
  //   }

  //   if (nextStep) {
  //     this.currentSteps.push(nextStep);
  //     this.setChatContent(this.currentSteps);
  //   }
  // }

  // ngAfterViewInit(): void {
  //   // Now you can safely access the aiChatComponent and its chatContent
  //   console.log('Chat content:', this.aiChatComponent.chatContent);
  // }

  // // Method to get chat content
  // getChatContent(): WorkflowStep[] {
  //   return this.aiChatComponent?.chatContent || [];
  // }

  // Method to set chat content
  setChatContent(newContent: WorkflowStep[]): void {
    if (this.aiChatComponent) {
      this.aiChatComponent.chatContent = newContent;
    }
  }

  // // Method to add a step to chat content
  // addChatStep(step: WorkflowStep): void {
  //   if (this.aiChatComponent) {
  //     this.aiChatComponent.chatContent.push(step);
  //   }
  // }
}
