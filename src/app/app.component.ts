import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExerciseCardComponent, Exercicio } from './exercise-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ExerciseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  grupos = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Cardio'];
  grupoSelecionado = 'Todos';

  novoNome = '';
  novoGrupo = 'Peito';
  novasSeries = 4;
  novasRepeticoes = '10-12';
  novaCarga = 20;

  exercicios: Exercicio[] = [
    { id: 1, nome: 'Supino Reto', grupo: 'Peito', series: 4, repeticoes: '10', cargaKg: 40, concluido: true },
    { id: 2, nome: 'Puxada Frontal', grupo: 'Costas', series: 4, repeticoes: '12', cargaKg: 45, concluido: false },
    { id: 3, nome: 'Agachamento Livre', grupo: 'Pernas', series: 4, repeticoes: '8-10', cargaKg: 60, concluido: false },
    { id: 4, nome: 'Elevação Lateral', grupo: 'Ombros', series: 3, repeticoes: '12-15', cargaKg: 10, concluido: false },
    { id: 5, nome: 'Corrida na Esteira', grupo: 'Cardio', series: 1, repeticoes: '20 min', cargaKg: 0, concluido: false },
  ];

  get exerciciosFiltrados(): Exercicio[] {
    if (this.grupoSelecionado === 'Todos') {
      return this.exercicios;
    }
    return this.exercicios.filter((e) => e.grupo === this.grupoSelecionado);
  }

  get totalConcluidos(): number {
    return this.exercicios.filter((e) => e.concluido).length;
  }

  adicionarExercicio(): void {
    const nome = this.novoNome.trim();
    if (!nome) return;

    this.exercicios.unshift({
      id: Date.now(),
      nome,
      grupo: this.novoGrupo,
      series: Number(this.novasSeries) || 3,
      repeticoes: this.novasRepeticoes.trim() || '12',
      cargaKg: Number(this.novaCarga) || 0,
      concluido: false,
    });
    this.novoNome = '';
  }

  alternarConclusao(id: number): void {
    this.exercicios = this.exercicios.map((e) =>
      e.id === id ? { ...e, concluido: !e.concluido } : e
    );
  }

  removerExercicio(id: number): void {
    this.exercicios = this.exercicios.filter((e) => e.id !== id);
  }
}
