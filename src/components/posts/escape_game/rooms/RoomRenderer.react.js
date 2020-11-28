import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import StudyRoom from "./study/StudyRoom.react";
import StudyRoomDoor from "./study/StudyRoomDoor.react";
import StudyRoomPainting from "./study/StudyRoomPainting.react";
import HallwayRoom from "./hallway/HallwayRoom.react";

const START_ROOM = "study-room";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const getRoom = (key: string, room_props: Props): React.Node => {
  switch (key) {
    case START_ROOM:
      return {
        name: "The Study",
        renderer: <StudyRoom {...room_props} />,
      };
    case "study-room-door":
      return {
        name: "The Door to the Study",
        renderer: <StudyRoomDoor {...room_props} />,
      };
    case "study-room-painting":
      return {
        name: "A Painting of a Boat",
        renderer: <StudyRoomPainting {...room_props} />,
      };
    case "hallway-room":
      return {
        name: "The Hallway outside the Study",
        renderer: <HallwayRoom {...room_props} />,
      };
    default:
      console.log("Invalid room key:", key);
      return null;
  }
};

const RoomRenderer: FunctionalComponent = (props: Props) => {
  const { flags, addFlag } = props;
  const [room, setRoom] = useState(START_ROOM);

  const room_props = {
    addFlag,
    flags,
    setRoom,
  };

  const room_obj = getRoom(room, room_props);

  return (
    <div className="renderer">
      <h3 style={{ marginBottom: "1em" }}>{room_obj.name}</h3>
      <div>{room_obj.renderer}</div>
    </div>
  );
};

export default RoomRenderer;
