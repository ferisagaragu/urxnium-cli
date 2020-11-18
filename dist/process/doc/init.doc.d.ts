import { Command } from '../../core/interface/command';
export declare class InitDoc extends Command {
    constructor();
    init(): void;
    private getDocumentationType;
    private getRestQuestions;
    private getFunctionalQuestions;
    private getBothQuestions;
    private setMain;
}
