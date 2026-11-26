import { Task } from '../types/task';

export const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Подготовить лабораторную работу №1',
        subject: 'Программирование',
        priority: 'high',
        status: 'active',
        createdAt: '2026-09-01T09:00:00.000Z',
    },
    {
        id: '2',
        title: 'Повторить тему по сетям',
        subject: 'Компьютерные сети',
        priority: 'medium',
        status: 'active',
        createdAt: '2026-09-01T09:05:00.000Z',
    },
    {
        id: '3',
        title: 'Сделать презентацию',
        subject: 'Информационные технологии',
        priority: 'low',
        status: 'completed',
        createdAt: '2026-09-01T09:10:00.000Z',
    },
];