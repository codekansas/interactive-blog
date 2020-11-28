import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";

interface Message {
  text: string;
  mine: boolean;
  last: boolean;
}

interface Props {
  name: string;
  messages: Array<Message>;
}

const PhoneChat: FunctionalComponent = (props: Props) => {
  const { name, messages } = props;

  let message_groups = [],
    message_group = [];
  for (let i = 0; i < messages.length; i++) {
    const last_message =
      i + 1 === messages.length || messages[i].mine !== messages[i + 1].mine;
    let class_name = "message";
    if (last_message) {
      class_name += " last";
    }

    message_group.push(
      <div key={"message_" + i} className={class_name}>
        {messages[i].text}
      </div>
    );

    if (last_message) {
      let group_class_name = "message";
      if (messages[i].mine) {
        group_class_name += " mine";
      } else {
        group_class_name += " yours";
      }
      message_groups.push(
        <div className={group_class_name} key={"group_" + i}>
          {message_group}
        </div>
      );
      message_group = [];
    }
  }

  return (
    <div className="phone">
      <h3>{name}</h3>
      <div className="chat">{message_groups}</div>
    </div>
  );
};

export default PhoneChat;
