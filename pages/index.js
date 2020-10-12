import { css, cx } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data } from "../data";
import produce from "immer";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const Index = () => {
  const [state, dispatch] = useReducer(dragReducer, {
    items: data,
  });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  return (
    <div className={css(tw`flex flex-row h-screen p-4`)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cx(
                  styles.dropper,
                  snapshot.isDraggingOver && styles.dropOver
                )}
              >
                {state.items?.map((person, index) => {
                  return (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={cx(
                              styles.dragger,
                              snapshot.isDragging && styles.dragging
                            )}
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
        <Droppable droppableId="items2" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cx(
                  styles.dropper,
                  snapshot.isDraggingOver && styles.dropOver
                )}
              >
                {state.items2?.map((person, index) => {
                  return (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={cx(
                              styles.dragger,
                              snapshot.isDragging && styles.dragging
                            )}
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
    tw`px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`
  ),
  dropper: css(tw`w-auto px-4 min-w-1/4 max-w-1/2`),
  draggerContent: css(tw`flex items-center space-x-3 text-base`),
  draggerIcon: css(
    tw`inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`
  ),
  dragging: css(tw`bg-gray-300`),
  dropOver: css(tw`bg-gray-100`),
};
