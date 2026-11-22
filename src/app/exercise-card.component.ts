import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Exercicio {
  id: number;
  nome: string;
  grupo: string;
  series: number;
  repeticoes: string;
  cargaKg: number;
  concluido: boolean;
}

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  template: `
    <article class="card" [class.done]="exercicio.concluido">
      <div class="card-top">
        <span class="group">{{ exercicio.grupo }}</span>
        <button type="button" class="toggle-btn" (click)="alternar.emit(exercicio.id)">
          {{ exercicio.concluido ? 'Concluído' : 'Marcar feito' }}
        </button>
      </div>
      <h3>{{ exercicio.nome }}</h3>
      <p class="meta">
        {{ exercicio.series }} séries × {{ exercicio.repeticoes }} • Carga: {{ exercicio.cargaKg }} kg
      </p>
      <button type="button" class="remove-btn" (click)="remover.emit(exercicio.id)">
        Remover
      </button>
    </article>
  `,
  styles: [`
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .card.done {
      border-color: #22c55e;
      opacity: 0.85;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .group {
      font-size: 0.78rem;
      font-weight: 700;
      color: #f43f5e;
    }
    .meta {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    .toggle-btn {
      background: #0f172a;
      color: #e2e8f0;
      border: 1px solid #475569;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
    }
    .card.done .toggle-btn {
      background: #16a34a;
      border-color: #16a34a;
      color: #ffffff;
    }
    .remove-btn {
      align-self: flex-start;
      background: transparent;
      color: #fda4af;
      border: 1px solid #881337;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.82rem;
    }
  `]
})
export class ExerciseCardComponent {
  @Input({ required: true }) exercicio!: Exercicio;
  @Output() alternar = new EventEmitter<number>();
  @Output() remover = new EventEmitter<number>();
}
