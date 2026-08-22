import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PendingTasks,
  signal,
  viewChild,
} from '@angular/core';

import { ArchitectureSceneController } from '../../services/architecture-scene-controller';

@Component({
  selector: 'app-architecture-scene',
  imports: [],
  templateUrl: './architecture-scene.html',
  styleUrl: './architecture-scene.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureScene {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly controller = inject(ArchitectureSceneController);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly pendingTasks = inject(PendingTasks);
  private cleanup = () => undefined;

  protected readonly ready = signal(false);

  constructor() {
    afterNextRender(() => {
      this.pendingTasks.run(() => this.initialize());
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private async initialize(): Promise<void> {
    if (
      typeof WebGLRenderingContext === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 56rem) and (min-height: 40rem)').matches
    ) {
      return;
    }

    const THREE = await import('three');

    if (this.destroyRef.destroyed) {
      return;
    }

    const canvas = this.canvas().nativeElement;
    const host = this.host.nativeElement;
    let renderer: InstanceType<typeof THREE.WebGLRenderer>;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 3.8, 6.8);
    camera.lookAt(0, 0, 0);

    const stack = new THREE.Group();
    stack.rotation.set(-0.4, -0.55, 0.04);
    scene.add(stack);

    const ambientLight = new THREE.HemisphereLight(0xfffaf0, 0x211f1a, 2.2);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 6, 5);
    scene.add(ambientLight, keyLight);

    const definitions = [
      { width: 3.6, depth: 2.15, color: 0xf7f1e3 },
      { width: 3.3, depth: 1.95, color: 0xe5ad19 },
      { width: 3.75, depth: 2.25, color: 0xfffaf0 },
      { width: 3.15, depth: 1.85, color: 0xe5ad19 },
      { width: 3.5, depth: 2.05, color: 0xf7f1e3 },
    ] as const;
    const layers: InstanceType<typeof THREE.Mesh>[] = [];
    const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
    const materials: InstanceType<typeof THREE.Material>[] = [];

    definitions.forEach((definition, index) => {
      const geometry = new THREE.BoxGeometry(definition.width, 0.18, definition.depth);
      const material = new THREE.MeshStandardMaterial({
        color: definition.color,
        metalness: 0,
        roughness: 0.78,
      });
      const layer = new THREE.Mesh(geometry, material);
      const edgeGeometry = new THREE.EdgesGeometry(geometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x211f1a });
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

      layer.position.y = (index - 2) * 0.22;
      layer.add(edges);
      stack.add(layer);
      layers.push(layer);
      geometries.push(geometry, edgeGeometry);
      materials.push(material, edgeMaterial);
    });

    let pointerX = 0;
    let pointerY = 0;
    let progress = 0;

    const render = () => renderer.render(scene, camera);
    const updateScene = (nextProgress: number) => {
      progress = nextProgress;
      const spread = Math.sin(progress * Math.PI);

      layers.forEach((layer, index) => {
        const offset = index - 2;
        layer.position.set(offset * 0.08 * spread, offset * (0.22 + 0.55 * spread), 0);
        layer.rotation.y = offset * 0.035 * spread;
      });

      stack.rotation.x = -0.4 + pointerY * 0.08;
      stack.rotation.y = -0.55 + progress * 0.85 + pointerX * 0.12;
      render();
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      updateScene(progress);
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      updateScene(progress);
    };
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const width = Math.max(1, entry.contentRect.width);
      const height = Math.max(1, entry.contentRect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      render();
    });
    const disconnectController = this.controller.connect(updateScene);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    resizeObserver.observe(host);
    this.ready.set(true);

    this.cleanup = () => {
      disconnectController();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }
}
