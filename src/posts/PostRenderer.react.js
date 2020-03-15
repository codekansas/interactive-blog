import React, { FunctionalComponent } from 'react';
import { PostInfo } from 'posts/PostMap.react';
import 'css/pages/Post.scss';
import LazyLoad from 'react-lazyload';
import ReactUtterances from 'react-utterances';

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
      <h1 className="padded bottom title">{title}</h1>
      <h4 className="emphasis bottom blurb">{blurb}</h4>
      <LazyLoad>
        {renderer()}
      </LazyLoad>
      <ReactUtterances repo="codekansas/interactive-blog" type="pathname" />
    </div>
  );
};

export default PostRenderer;
