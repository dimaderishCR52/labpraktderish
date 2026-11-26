import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TaskDraft } from '../types/task';
import { loadDraft, removeDraft, saveDraft } from '../storage/storage';

export function useTaskDraft(
    enabled: boolean,
    values: TaskDraft,
    onRestore: (draft: TaskDraft) => void,
) {
    const [loaded, setLoaded] = useState(!enabled);
    const { title, subject, priority, dueDate } = values;

    useEffect(() => {
        if (!enabled) return;
        let active = true;

        loadDraft()
            .then((draft) => {
                if (!active) return;
                if (!draft || (!draft.title && !draft.subject)) {
                    setLoaded(true);
                    return;
                }
                Alert.alert('Восстановить черновик?', 'Найден сохранённый черновик формы.', [
                    {
                        text: 'Не восстанавливать',
                        style: 'cancel',
                        onPress: () => {
                            removeDraft().catch(() => {});
                            setLoaded(true);
                        },
                    },
                    {
                        text: 'Восстановить',
                        onPress: () => {
                            onRestore(draft);
                            setLoaded(true);
                        },
                    },
                ]);
            })
            .catch(() => {
                if (active) setLoaded(true);
            });

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    useEffect(() => {
        if (!enabled || !loaded) return;
        saveDraft({ title, subject, priority, dueDate }).catch(() => {});
    }, [enabled, loaded, title, subject, priority, dueDate]);

    return { removeDraft };
}