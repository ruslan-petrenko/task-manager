import { type DraggableAttributes } from '@dnd-kit/core';
import styles from '../Task.module.css';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export default function DragButton(props: { attributes: DraggableAttributes, listeners: SyntheticListenerMap | undefined }) {
    const { attributes, listeners } = props;
    return (
        <button {...attributes}
            {...listeners}
            className={styles.dragHandle}
            aria-label="Drag task"
        >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="5" cy="4" r="1.5" />
                <circle cx="11" cy="4" r="1.5" />
                <circle cx="5" cy="8" r="1.5" />
                <circle cx="11" cy="8" r="1.5" />
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="11" cy="12" r="1.5" />
            </svg>
        </button>
    );
}