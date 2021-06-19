import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HiCheck, HiX } from "react-icons/hi";
import ITodo from "../interfaces/todo";

interface TodoProps {
  id: string;
  index: number;
  todo: ITodo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Todo = ({
  id,
  index,
  todo,
  toggleTodo,
  removeTodo,
  moveTodo,
}: TodoProps) => {
  const ItemTypes = {
    CARD: "card",
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTodo(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="flex items-center p-5 border-5 dark:border-gray-700 text-gray-600 dark:text-gray-400 flex-wrap"
    >
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 z-10 ${
          todo.completed && "bg-gradient-to-br from-blue-400 to-purple-400"
        }`}
        onClick={() => toggleTodo(todo.id)}
      >
        <HiCheck
          className={`text-bold text-white ${
            todo.completed ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <h3
        className={`ml-4 flex-1 ${
          todo.completed && "line-through text-gray-300 dark:text-gray-700"
        }`}
      >
        <span onClick={() => toggleTodo(todo.id)}>{todo.name}</span>
      </h3>
      <button
        className="ml-auto px-2 text-xl"
        onClick={() => removeTodo(todo.id)}
      >
        <HiX />
      </button>
    </div>
  );
};

export default Todo;
