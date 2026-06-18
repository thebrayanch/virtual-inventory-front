import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-placeholder',
  standalone: true,
  template: `
    <div class="placeholder">
      <h2 class="placeholder-title">{{ title }}</h2>
      <p class="placeholder-text">Módulo en construcción</p>
    </div>
  `,
  styles: [`
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60dvh;
      text-align: center;
    }

    .placeholder-title {
      font-size: var(--font-size-2xl);
      font-weight: 600;
      color: var(--surface-900);
      margin: 0 0 0.5rem;
    }

    .placeholder-text {
      color: var(--surface-500);
      font-size: var(--font-size-lg);
      margin: 0;
    }
  `],
})
export class PagePlaceholderComponent {
  private route = inject(ActivatedRoute);
  protected title = this.route.snapshot.data['title'] ?? 'Página';
}
