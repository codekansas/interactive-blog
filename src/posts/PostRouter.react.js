import React, { FunctionalComponent } from 'react';
import { Link } from 'react-router-dom';
import { CardColumns, Card } from 'react-bootstrap';
import PostMap from 'posts/PostMap.react';
import PostRenderer from 'posts/PostRenderer.react';

interface Props {
  post: ?string
}

const PostRouter: FunctionalComponent<Props> = (props: Props) => {
  const { post } = props;
  if (post == null || !PostMap.has(post)) {
    return (
      <div className="emphasis all">
        <h1 className="padded bottom">
          Posts
        </h1>
        <CardColumns>
          {
            [...PostMap.keys()].map((key) => {
              const { title, blurb } = PostMap.get(key);
              return (
                <Card className="text-center p-3" key={key}>
                  <Card.Body>
                    <Card.Title><Link to={`/posts/${key}`}>{title}</Link></Card.Title>
                    <Card.Text>{blurb}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          }
        </CardColumns>
      </div>
    );
  }
  return <PostRenderer info={PostMap.get(post)} />;
};

export default PostRouter;
