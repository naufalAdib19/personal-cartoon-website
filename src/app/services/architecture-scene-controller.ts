import { Injectable } from '@angular/core';

type ProgressListener = (progress: number) => void;

@Injectable({ providedIn: 'root' })
export class ArchitectureSceneController {
  private listener: ProgressListener | undefined;
  private progress = 0;

  connect(listener: ProgressListener): () => void {
    this.listener = listener;
    listener(this.progress);

    return () => {
      if (this.listener === listener) {
        this.listener = undefined;
      }
    };
  }

  setProgress(progress: number): void {
    this.progress = Math.min(1, Math.max(0, progress));
    this.listener?.(this.progress);
  }
}
