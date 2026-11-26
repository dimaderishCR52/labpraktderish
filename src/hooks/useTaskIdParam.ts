import { useLocalSearchParams } from 'expo-router';
import { TaskRouteParams } from '../types/navigation';

export function useTaskIdParam(): string | undefined {
    const { id } = useLocalSearchParams<TaskRouteParams>();
    return Array.isArray(id) ? id[0] : id;
}