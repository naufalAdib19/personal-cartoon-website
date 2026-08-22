import { TestBed } from '@angular/core/testing';

import { ArchitectureSceneController } from './architecture-scene-controller';

describe('ArchitectureSceneController', () => {
  it('connects a scene and clamps scroll progress', () => {
    const controller = TestBed.inject(ArchitectureSceneController);
    const updates: number[] = [];
    const disconnect = controller.connect((progress) => updates.push(progress));

    controller.setProgress(0.4);
    controller.setProgress(2);
    controller.setProgress(-1);
    disconnect();
    controller.setProgress(0.8);

    expect(updates).toEqual([0, 0.4, 1, 0]);
  });
});
