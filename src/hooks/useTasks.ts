import { useContext } from 'react';
import { TasksContext, TasksContextValue } from '../context/TasksContext';

export function useTasks(): TasksContextValue {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks должен использоваться внутри TasksProvider');
    }
    return context;
}