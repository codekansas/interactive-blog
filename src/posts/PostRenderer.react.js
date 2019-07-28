import React, { FunctionalComponent } from 'react';
import { PostInfo } from 'posts/PostMap.react';
import 'css/pages/Post.scss';

interface Props {
  info: PostInfo,
}

const PostRenderer: FunctionalComponent<Props> = (props: Props) => {
  const {
    info: {
      title, blurb, renderer,
    },
  } = props;
  return (
    <div className="emphasis all">
      <h1 className="padded bottom text-center title">{title}</h1>
      <h4 className="padded bottom text-center blurb">{blurb}</h4>
      {renderer()}
    </div>
  );
};

export default PostRenderer;
