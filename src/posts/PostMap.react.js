import React from 'react';
import Torchscript from 'posts/renderers/Torchscript.react';

export interface PostInfo {
  title: string,
  blurb: React.Node,
  renderer: React.Node
}

const PostMap: {
  [string]: PostInfo
} = new Map([
  [
    'torchscript', {
      title: 'Torchscript 🔥 verses Caffe2 ☕',
      blurb: (
        <span>
          Facebook is migrating a lot of our machine learning inference infrastructure over
          to Torchscript, so I figured I should write an informational blog post about the
          technical internals of each, as I understand them.
        </span>
      ),
      renderer: Torchscript,
    },
  ],
]);

export default PostMap;
