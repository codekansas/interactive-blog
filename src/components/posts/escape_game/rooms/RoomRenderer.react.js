import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import BalconyRoom from "./balcony/BalconyRoom.react";
import BasementRoom from "./basement/BasementRoom.react";
import HallwayElevator from "./hallway/HallwayElevator.react";
import HallwayRoom from "./hallway/HallwayRoom.react";
import HallwayStaircase from "./hallway/HallwayStaircase.react";
import StudyRoom from "./study/StudyRoom.react";
import StudyRoomDoor from "./study/StudyRoomDoor.react";
import StudyRoomPainting from "./study/StudyRoomPainting.react";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const getRoom = (key: string, room_props: Props): React.Node => {
  switch (key) {
    case "study-room":
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
    case "hallway-elevator":
      return {
        name: "The Elevator off the Hallway",
        renderer: <HallwayElevator {...room_props} />,
      };
    case "hallway-staircase":
      return {
        name: "The Staircase off the Hallway",
        renderer: <HallwayStaircase {...room_props} />,
      };
    case "balcony-room":
      return {
        name: "The Balcony",
        renderer: <BalconyRoom {...room_props} />,
      };
    case "basement-room":
      return {
        name: "The Basement",
        renderer: <BasementRoom {...room_props} />,
      };
    default:
      console.log("Invalid room key:", key);
      return null;
  }
};

const RoomRenderer: FunctionalComponent = (props: Props) => {
  const { flags, addFlag } = props;
  const [room, setRoom] = useState("study-room");
  // const [room, setRoom] = useState("basement-room");

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
