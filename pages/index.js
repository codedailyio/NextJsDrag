import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import { useCallback, useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data } from "../data";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Index = () => {
  const [items, setItems] = useState(data);
  const onDragStart = useCallback(() => {}, []);
  const onDragUpdate = useCallback(() => {}, []);
  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      setItems((items) =>
        reorder(items, result.source.index, result.destination.index)
      );
    }
  }, []);

  return (
    <div
      className={css(tw`flex flex-col justify-center items-center h-screen`)}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items?.map((person, index) => {
                  return (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={styles.dragger}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.draggerContent}>
                              <img
                                src={person.picture}
                                className={styles.draggerIcon}
                              />
                              <span>
                                {person.name.first} {person.name.last}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Index;
//
const styles = {
  dragger: css(
    tw`px-4 py-4 my-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 ease-in-out  bg-white shadow`
  ),
  draggerContent: css(tw`flex items-center text-base space-x-3`),
  draggerIcon: css(
    tw`inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`
  ),
};
