import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((task) => {
      if (params.status && task.status !== params.status) {
        return false;
      }
      if (params.title && !task.title.includes(params.title)) {
        return false;
      }
      return true;
    });
  }

  update(task: TaskDto) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.tasks[index] = task;
      return task;
    }

    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
  remove(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
