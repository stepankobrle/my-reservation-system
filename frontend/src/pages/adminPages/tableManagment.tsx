import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TableModal from '../../admin/components/tableModal';
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";

// Kartička stolu s informacemi o stavu, spojení a umístění
function SortableTableItem({ table, onEdit, onDelete }) {
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
            <div className="font-semibold">{table.name}</div>
            <div className="text-sm text-gray-700">Pro {table.seats} osob</div>
            <div className="text-xs text-gray-600 mt-1 flex flex-col gap-1">
        <span>
          <span className={table.active ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
            {table.active ? "Aktivní" : "Neaktivní"}
          </span>
        </span>
                <span>
          {table.canBeCombined
              ? <span className="text-blue-700 font-bold">Možno spojit</span>
              : <span className="text-gray-400">Nelze spojit</span>}
        </span>
                {(table.location1 || table.location2) && (
                    <span>
            Umístění: {table.location1}{table.location1 && table.location2 ? ", " : ""}{table.location2}
          </span>
                )}
            </div>
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
    const [tables, setTables] = useState([
        {
            id: '1',
            name: 'Stůl 1',
            seats: 5,
            active: true,
            canBeCombined: true,
            location1: "Terasa",
            location2: "Okno"
        },
        {
            id: '2',
            name: 'Stůl 2',
            seats: 4,
            active: false,
            canBeCombined: false,
            location1: "Salonek",
            location2: ""
        },
        // ... další stoly
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 20,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setTables((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handleEdit = (table) => {
        setEditingTable(table);
        setModalOpen(true);
    };

    const handleDelete = (table) => {
        setTableToDelete(table);
        setDeleteModalOpen(true);
    };

    const handleSave = (data) => {
        if (editingTable) {
            setTables((prev) => prev.map((t) => (t.id === data.id ? data : t)));
        } else {
            setTables((prev) => [...prev, { ...data, id: Date.now().toString() }]);
        }
        setModalOpen(false);
        setEditingTable(null);
    };

    const confirmDelete = () => {
        if (tableToDelete) {
            setTables((prev) => prev.filter((t) => t.id !== tableToDelete.id));
            setDeleteModalOpen(false);
            setTableToDelete(null);
        }
    };

    return (
        <div className="flex flex-col flex-1 bg-gray-50 min-h-screen p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Správa stolů</h1>
                <button
                    onClick={() => { setEditingTable(null); setModalOpen(true); }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
                >+</button>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={tables.map(t => t.id)} strategy={rectSortingStrategy}>
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
                        {tables.map(table => (
                            <SortableTableItem
                                key={table.id}
                                table={table}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Modal pro přidání/úpravu */}
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

            {/* Modal pro potvrzení mazání */}
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
