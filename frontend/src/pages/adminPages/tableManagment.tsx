// TableManagement.tsx
import { useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TableModal from '../../admin/components/tableModal';
import DeleteConfirmationModal from '../../admin/components/deleteConfirmationModal';
import { useAuth } from '../../admin/components/auth/authProvider';

function SortableTableItem({ table, onEdit, onDelete }: any) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: table.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-gray-200 rounded p-4 flex flex-col gap-2 relative"
        >
            <div className="font-semibold">{`Stůl ${table.number}`}</div>
            <div className="text-sm text-gray-700">Kapacita: {table.capacity}</div>
            {table.location && (
                <div className="text-xs text-gray-600">
                    Umístění: {table.location}
                </div>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(table);
                    }}
                    className="text-gray-600 hover:text-green-700 z-10"
                >✏️</button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(table);
                    }}
                    className="text-gray-600 hover:text-red-700 z-10"
                >🗑️</button>
            </div>
        </div>
    );
}

export default function TableManagement() {
    const { currentUser, loading } = useAuth();
    const [tables, setTables] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tableToDelete, setTableToDelete] = useState<any>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        const restaurantId = currentUser?.restaurantId;

        if (!token || !restaurantId) return;

        const url = `http://localhost:4000/api/admin/tables?restaurantId=${restaurantId}`;

        const fetchTables = async () => {
            try {
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Chyba při načítání stolů');
                const data = await res.json();
                setTables(data);
            } catch (err) {
                console.error('❌ Chyba při fetchování stolů:', err);
            }
        };

        fetchTables();
    }, [currentUser]);

    const handleSave = async (formData: any) => {
        const method = editingTable ? 'PATCH' : 'POST';
        const url = editingTable
            ? `http://localhost:4000/api/admin/tables/${formData.id}`
            : `http://localhost:4000/api/admin/tables`;

        const token = localStorage.getItem('token');
        const restaurantId = currentUser?.restaurantId;

        const body = {
            number: parseInt(formData.number),
            capacity: parseInt(formData.capacity),
            location: formData.location1 || '',
            restaurantId,
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const result = await res.json();

            if (!res.ok) {
                if (res.status === 400) {
                    alert(result.message || 'Číslo stolu už existuje.');
                }
                throw new Error(result.message || 'Chyba při ukládání');
            }

            if (editingTable) {
                setTables((prev) => prev.map((t) => (t.id === result.id ? result : t)));
            } else {
                setTables((prev) => [...prev, result]);
            }

            setModalOpen(false);
            setEditingTable(null);
        } catch (error) {
            console.error('❌ Chyba při ukládání:', error);
        }
    };

    const confirmDelete = async () => {
        if (!tableToDelete) return;
        try {
            const res = await fetch(`http://localhost:4000/api/admin/tables/${tableToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!res.ok) throw new Error('Chyba při mazání');

            setTables((prev) => prev.filter((t) => t.id !== tableToDelete.id));
            setDeleteModalOpen(false);
            setTableToDelete(null);
        } catch (err) {
            console.error('❌ Chyba při mazání stolu:', err);
        }
    };

    if (loading) return <p>Načítání...</p>;
    if (!currentUser) return <p>Neautorizováno</p>;

    return (
        <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md min-h-screen p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Správa stolů</h1>
                <button
                    onClick={() => {
                        setEditingTable(null);
                        setModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                >+
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={() => {}}>
                <SortableContext items={tables.map((t) => t.id)} strategy={rectSortingStrategy} children={
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
                        {tables.map((table) => (
                            <SortableTableItem
                                key={table.id}
                                table={table}
                                onEdit={(t: any) => {
                                    setEditingTable(t);
                                    setModalOpen(true);
                                }}
                                onDelete={(t: any) => {
                                    setDeleteModalOpen(true);
                                    setTableToDelete(t);
                                }}
                            />
                        ))}
                    </div>
                }>
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
                        {tables.map((table) => (
                            <SortableTableItem
                                key={table.id}
                                table={table}
                                onEdit={(t: any) => {
                                    setEditingTable(t);
                                    setModalOpen(true);
                                }}
                                onDelete={(t: any) => {
                                    setDeleteModalOpen(true);
                                    setTableToDelete(t);
                                }}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {modalOpen && (
                <TableModal
                    table={editingTable}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingTable(null);
                    }}
                    onSave={handleSave}
                />
            )}

            {deleteModalOpen && tableToDelete && (
                <DeleteConfirmationModal
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setTableToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}
